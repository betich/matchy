import axios from 'axios';
import React from 'react';
import { Container, Form, Button, ButtonGroup } from 'react-bootstrap';
import Tag from '../../../Components/Tag';
import { Interests } from '../../../Services/Mock';

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
            experiences: [],
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
        const ExpTags = ['a', 'b', 'c', 'd'];

        const ExperienceTags = ExpTags.map((item, i) => {
            return (
                <Tag change={this.tagChange} type="experiences" name={item} key={i} />
            )
        });

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

                    <Form.Group className="mb-3" controlId="formExperiences">
                        <Form.Label>Experiences:</Form.Label>
                        <ButtonGroup toggle>
                            {ExperienceTags}
                        </ButtonGroup>
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