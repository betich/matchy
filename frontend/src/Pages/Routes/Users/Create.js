import axios from 'axios';
import React from 'react';
import { Container, Form, Button, ButtonGroup } from 'react-bootstrap';
import Tag from '../../../Components/Tag';
import ExperienceGroup from '../../../Components/ExperienceFields';
import DatePicker from '../../../Components/DatePicker';
import { Interests, EducationOptions } from '../../../Services/Mock';

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birthday: {},
            experiences: {},
            interests: []
        }
        this.setInfo = this.setInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
    }

    tagChange (name, label, checked) {
        let newTags;
        const modifyTags = (tags) => {
            let idx = tags.findIndex((e) => e === label);
            return checked ?
                tags.concat(label) : tags.slice(0, idx).concat(tags.slice(idx+1, tags.length));
        };

        switch (name) {
            case 'interests':
                newTags = modifyTags(this.state.interests);
                this.setState({ interests: newTags });
                break;
            default:
                console.log('unknown tag element selected');
        }
    }

    setInfo (type, fields) {
        this.setState({ experiences: { ...this.state.experiences, [type]: fields } });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        data.append('birthday', this.state.birthday);
        data.append('experiences', this.state.experiences);
        data.append('interests', this.state.interests);

        // console.log('d', e.target.elements.user, e.target.elements.user["username"])
        // console.log('f', e.target.user.value, e.target.user["username"].value)

        /*
        axios.post('/app/users', this.state)
        .then((response) => {
            if (response.status === 200) {
                this.props.history.push(`/users/${response.data._id}`);
            }
        }, (err) => {
            console.log(err);
        });
        */
    }

    handleBirthday(date) {
        this.setState({ birthday: date });
    }

    render() {
        const InterestTags = Interests.map((item, i) => {
            return (
                <Tag onChange={this.tagChange} name="interests" label={item} key={i} />
            )
        });

        return (
            <Container className="mt-3">
                <h1>Create User</h1>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required name="username" placeholder="Username" />
                    </Form.Group>
                    
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required name="email" type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="fullname">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control required name="fullname" placeholder="Full Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="education">
                        <Form.Label>Education:</Form.Label>
                        <ExperienceGroup type="select" name="education" onChange={this.setInfo} options={EducationOptions} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="work">
                        <Form.Label>Work:</Form.Label>
                        <ExperienceGroup type="input" name="work" onChange={this.setInfo} />
                    </Form.Group>

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <DatePicker onChange={this.handleBirthday} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="interests">
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