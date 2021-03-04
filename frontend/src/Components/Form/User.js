import React from 'react';
import { Col, Form } from 'react-bootstrap';
import Tags from '../Tag';
import ExperienceGroup from '../ExpandableFields';
import DatePicker from '../DatePicker';
import { TagsList as Interests, EducationOptions } from '../../Services/Mock';

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        let oldData = this.props.oldData;
        this.state = (oldData) ? {
            username: oldData.username,
            fullname: oldData.fullname,
            password: oldData.password,
            email: oldData.email,
            birthday: {
                day: oldData.birthday.day,
                month: oldData.birthday.month,
                year: oldData.birthday.year
            },
            experiences: {
                education: oldData.experiences.education,
                work: oldData.experiences.work
            },
            interests: oldData.interests
        } : {
            username: "",
            fullname: "",
            password: "",
            email: "",
            birthday: {
                day: "",
                month: "",
                year: ""
            },
            experiences: {
                education: [],
                work: []
            },
            interests: []
        }

        this.tagChange = this.tagChange.bind(this);
        this.setInfo = this.setInfo.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    tagChange(group, tags) {
        switch (group) {
            case "interests":
                this.setState({ interests: tags }, () => {
                    this.props.inputChange(this.state);
                });
                break;
            default:
                console.error("unknown tag group");
        }
    }

    setInfo(type, fields) {
        this.setState({
            experiences: { ...this.state.experiences, [type]: fields },
        }, () => {
            this.props.inputChange(this.state);
        });
    }

    handleBirthday(date) {
        this.setState({ birthday: date }, () => {
            this.props.inputChange(this.state);
        });
    }

    inputChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.props.inputChange(this.state);
        });
    }

    render() {
        const UserNamePassword = () => {
            if (!this.props.edit) {
                return (
                    <>
                        <Form.Row>
                            <Form.Group as={Col} sm={12} controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    autoFocus
                                    name="username"
                                    placeholder="Username"
                                    onChange={this.inputChange}
                                    value={this.state.username}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} sm={12} controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.inputChange}
                                    value={this.state.password}
                                />
                            </Form.Group>
                        </Form.Row>
                    </>
                );
            }
        }
        return (
            <>
                { UserNamePassword() }

                <Form.Row>
                    <Form.Group as={Col} sm={12} controlId="fullname">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            required
                            name="fullname"
                            placeholder="Full Name"
                            onChange={this.inputChange}
                            value={this.state.fullname}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={this.inputChange}
                            value={this.state.email}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12} controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <DatePicker
                            onChange={this.handleBirthday}
                            day={this.state.birthday.day}
                            month={this.state.birthday.month}
                            year={this.state.birthday.year}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12} className="mb-3" controlId="education">
                        <Form.Label>Education</Form.Label>
                        <ExperienceGroup
                            type="select"
                            name="education"
                            onChange={this.setInfo}
                            options={EducationOptions}
                            defaultValue={this.state.experiences.education}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12} className="mb-3" controlId="work">
                        <Form.Label>Work</Form.Label>
                        <ExperienceGroup
                            type="input"
                            name="work"
                            onChange={this.setInfo}
                            defaultValue={this.state.experiences.work}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12} className="mb-3" controlId="interests">
                        <Form.Label>Interests</Form.Label>
                        <Tags
                            onChange={this.tagChange}
                            tags={Interests}
                            group="interests"
                            onAsDefault={this.state.interests}
                        />
                    </Form.Group>
                </Form.Row>
            </>
        );
    }
}

export default UserForm;