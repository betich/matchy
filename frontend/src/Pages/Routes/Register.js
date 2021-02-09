import axios from 'axios';
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Tags from '../../Components/Tag';
import ExperienceGroup from '../../Components/ExpandableFields';
import DatePicker from '../../Components/DatePicker';
import { Interests, EducationOptions } from '../../Services/Mock';
import validate from "../../Services/Validate";
import Error from "../../Components/Error";

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birthday: {
                day: '2',
                month: '1',
                year: '2001'
            },
            experiences: { education: {}, work: {} },
            interests: [],
            errors: {}
        }
        this.setInfo = this.setInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
    }

    tagChange(group, tags) {
        switch (group) {
            case 'interests':
                this.setState({ interests: tags })
                break;
            default:
                console.error('unknown tag group');
        }
    }

    setInfo (type, fields) {
        this.setState({ experiences: { ...this.state.experiences, [type]: fields } });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        for ( let i = 0; i < this.state.interests.length; i++ ) {
            data.append('interests[]', this.state.interests[i]);
        }

        Object.keys(this.state.birthday).forEach(key => data.append(`birthday[${key}]`, this.state.birthday[key]));
        Object.keys(this.state.experiences).forEach(key => data.append(`experiences[${key}]`, JSON.stringify(this.state.experiences[key])));

        const { valid, invalidData } = validate(data);
        
        if (valid) {
            const options = {
                headers: {'Content-Type': 'multipart/form-data' }
            };
            
            axios.post('/app/register', data, options)
            .then((response) => {
                if (response.status === 200) {
                    this.props.history.push(`/users/${response.data._id}`);
                }
            }, (err) => {
                console.error(err);
            });
        } else {
            this.setState({ errors: invalidData });
        }
    }

    handleBirthday(date) {
        this.setState({ birthday: date });
    }

    render() {
        return (
            <Container className="mt-3">
                <h1>Create User</h1>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required autoFocus name="username" placeholder="Username" />
                    </Form.Group>
                    
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required name="email" type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Form.File id="formcheck-api-custom" custom>
                        <Form.File.Input isValid />
                        <Form.File.Label data-browse="Browse...">
                            Profile Picture
                        </Form.File.Label>
                        <Form.Control.Feedback type="valid">yay!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Yo this is required</Form.Control.Feedback>
                    </Form.File>

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
                        <DatePicker onChange={this.handleBirthday} day={this.state.birthday.day} month={this.state.birthday.month} year={this.state.birthday.year} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="interests">
                        <Form.Label>Interests:</Form.Label>
                        <Tags onChange={this.tagChange} tags={Interests} group="interests" />
                    </Form.Group>

                    <Error errors={this.state.errors} />

                    <Button variant="info" type="submit">
                        Create
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Create;