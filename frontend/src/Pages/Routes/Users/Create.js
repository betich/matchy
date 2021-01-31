import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ButtonGroup, Col } from 'react-bootstrap';
import { FaWindowClose } from "react-icons/fa";
import Tag from '../../../Components/Tag';
import { Interests } from '../../../Services/Mock';

const ExperienceField = (props) => {
    const [field, setField] = useState({ uID: props.uID });
    const [type, setType] = useState(props.type);
    const [value, setValue] = useState(props.value);

    const typeChange = (e) => setType(e.target.value);

    const valueChange = (e) => setValue(e.target.value);

    useEffect(() => {
        setField({ type: type, value: value, uID: props.uID });
    }, [type, value, props.uID])

    useEffect(() => {
        let handleChange = props.handleFieldChange;
        handleChange(field);
    }, [props.handleFieldChange, field])

    const sendDelete = (e) => {
        e.preventDefault();
        props.handleDelete(field);
    }

    return (
        <Form.Row>
            <Col>
                <Form.Control
                    as="select"
                    defaultValue={props.type}
                    onChange={typeChange}
                >
                    <option>Middle-School</option>
                    <option>High-School</option>
                    <option>College</option>
                </Form.Control>
            </Col>
            <Col>
                <Form.Control
                    required
                    value={value}
                    onChange={valueChange}
                />
            </Col>
            <Col>
                <Button variant="danger" onClick={sendDelete}>
                    <FaWindowClose size={16} />
                </Button>
            </Col>
        </Form.Row>
    );
}

class ExperienceGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
                { type: 'highschool', value: 'Triam Udom Suksa', uID: 1 }
            ],
            IDCount: 1
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleAdd(e) {
        e.preventDefault();
        let newUID = this.state.IDCount + 1;
        let newFields = [...this.state.fields].concat({type: 'highschool', value: '', uID: newUID});
        
        this.setState({ fields: newFields, IDCount: newUID });
    }
    
    handleDelete(field) {
        let newFields = [...this.state.fields];
        for (let i = 0; i < newFields.length; i++) {
            if (field["uID"] === this.state.fields[i]["uID"]) {
                newFields = newFields.slice(0, i).concat(newFields.slice(i+1, newFields.length));
            }
        }

        this.setState({ fields: newFields });
    }

    handleFieldChange(field) {
        let newFields = [...this.state.fields];
        
        for (let i in newFields) {
            if (field["uID"] === this.state.fields[i]["uID"]) {
                newFields[i] = field;
            }
        }

        this.setState({ fields: newFields });
    }
    
    render() {
        let fieldElems = this.state.fields.map((field) => {
            return <ExperienceField
                key={field.uID}
                uID={field.uID}
                type={field.type}
                value={field.value}
                handleFieldChange={this.handleFieldChange}    
                handleDelete={this.handleDelete}
            />;
        });
        return (
            <>
                <Button variant="danger" onClick={this.handleAdd}>Add</Button>
                {fieldElems}
            </>
        );
    }
}

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            email: '',
            password: '',
            fullname: '',
            birthday: {
                day: 1,
                month: 1,
                year: 2000
            },
            experiences: {},
            interests: []
        }
    }

    tagChange (type, name, checked) {
        let newTags;
        const modifyTags = (tags) => {
            let idx = tags.findIndex((e) => e === name);
            return checked ?
                tags.concat(name) : tags.slice(0, idx).concat(tags.slice(idx+1, tags.length));
        };

        switch (type) {
            case 'experiences':
                newTags = modifyTags(this.state.experiences);
                this.setState({ experiences: newTags });
                break;
            case 'interests':
                newTags = modifyTags(this.state.interests);
                this.setState({ interests: newTags });
                break;
            default:
                console.log('unknown tag element selected');
        }
    }

    setInfo (type, fields) {
        let res = {};
        res["experiences"][type] = fields;
        this.setState(res);
    }

    async handleSubmit(e) {
        e.preventDefault();

        axios.post('/app/users', this.state)
        .then((response) => {
            if (response.status === 200) {
                this.props.history.push(`/users/${response.data._id}`);
            }
        }, (err) => {
            console.log(err);
        });
    }

    handleChange(e) {
        switch (e.target.id) {
            case 'formUserName':
                this.setState({ username: e.target.value });
                break;
            case 'formUserFullName':
                this.setState({ fullname: e.target.value });
                break;
            case 'formUserEmail':
                this.setState({ email: e.target.value });
                break;
            case 'formUserPassword':
                this.setState({ password: e.target.value });
                break;
            default:
                console.log("unknown input");
        }
    }

    render() {
        const InterestTags = Interests.map((item, i) => {
            return (
                <Tag change={this.tagChange} type="interests" name={item} key={i} />
            )
        });

        return (
            <Container className="mt-3">
                <h1>Create User</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required onChange={this.handleChange} placeholder="Username" />
                    </Form.Group>
                    
                    <Form.Group controlId="formUserEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required onChange={this.handleChange} type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required onChange={this.handleChange} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formUserFullName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control required onChange={this.handleChange} placeholder="Full Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="education">
                        <Form.Label for="education">Education:</Form.Label>
                        <ExperienceGroup setInfo={this.setInfo} type="education" />
                    </Form.Group>

                    <Form.Group classname="mb-3" controlId="work">
                        <Form.Label for="work">Work:</Form.Label>
                        <ExperienceGroup setInfo={this.setInfo} type="work" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formInterests">
                        <Form.Label>Interests:</Form.Label>
                        <ButtonGroup toggle>
                            {InterestTags}
                        </ButtonGroup>
                    </Form.Group>

                    <Button variant="info" type="submit">
                        Create
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Create;