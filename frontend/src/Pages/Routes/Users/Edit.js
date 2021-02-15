import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Tags from "../../../Components/Tag";
import ExperienceGroup from "../../../Components/ExpandableFields";
import DatePicker from "../../../Components/DatePicker";
import { Interests, EducationOptions } from "../../../Services/Mock";
import validate from "../../../Services/Validate";
import Error from "../../../Components/Error";

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birthday: {
                day: "",
                month: "",
                year: "",
            },
            experiences: { education: [], work: [] },
            interests: [],
            errors: {},
            oldUserData: null,
            loaded: false,
        };
        this.setInfo = this.setInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/app/users/${this.props.match.params.username}`)
            .then((res) => res.data)
            .then((user) => {
                this.setState({ oldUserData: user });
                this.setState({
                    birthday: {
                        day: user.birthday.day,
                        month: user.birthday.month,
                        year: user.birthday.year,
                    },
                    experiences: user.experiences
                });
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => this.setState({ loaded: true }));
    }

    tagChange(group, tags) {
        switch (group) {
            case "interests":
                this.setState({ interests: tags });
                break;
            default:
                console.error("unknown tag group");
        }
    }

    setInfo(type, fields) {
        this.setState({
            experiences: { ...this.state.experiences, [type]: fields },
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        for (let i = 0; i < this.state.interests.length; i++) {
            data.append("interests[]", this.state.interests[i]);
        }

        Object.keys(this.state.birthday).forEach((key) =>
            data.append(`birthday[${key}]`, this.state.birthday[key])
        );
        
        Object.keys(this.state.experiences).forEach((key) =>
            data.append(
                `experiences[${key}]`,
                JSON.stringify(this.state.experiences[key])
            )
        );

        const { valid, invalidData } = validate(data);

        if (valid) {
            const options = {
                headers: { "Content-Type": "multipart/form-data" },
            };

            axios
                .put(`/app/users/${this.props.match.params.username}`, data, options)
                .then(
                    (response) => {
                        if (response.status === 200) {
                            this.props.history.push(
                                `/users/${this.props.match.params.username}`
                            );
                        }
                    },
                    (err) => {
                        console.error(err);
                    }
                );
        } else {
            this.setState({ errors: invalidData });
        }
    }

    handleBirthday(date) {
        this.setState({ birthday: date });
    }

    render() {
        const renderComponents = () => {
            const EditUser = () => {
                return (
                    <>
                        <Link to={`/users/${this.state.oldUserData.username}`}>back</Link>
                        <h1>Edit user information</h1>
                        <Form onSubmit={this.handleSubmit} noValidate>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    autoFocus
                                    name="username"
                                    placeholder="Username"
                                    defaultValue={
                                        this.state.oldUserData.username
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    defaultValue={
                                        this.state.oldUserData.email
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="fullname">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    required
                                    name="fullname"
                                    placeholder="Full Name"
                                    defaultValue={
                                        this.state.oldUserData.fullname
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="education"
                            >
                                <Form.Label>Education:</Form.Label>
                                <ExperienceGroup
                                    type="select"
                                    name="education"
                                    onChange={this.setInfo}
                                    options={EducationOptions}
                                    defaultValue={
                                        this.state.oldUserData
                                            .experiences.education
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="work">
                                <Form.Label>Work:</Form.Label>
                                <ExperienceGroup
                                    type="input"
                                    name="work"
                                    onChange={this.setInfo}
                                    defaultValue={
                                        this.state.oldUserData
                                            .experiences.work
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="birthday">
                                <Form.Label>Birthday</Form.Label>
                                <DatePicker
                                    onChange={this.handleBirthday}
                                    day={this.state.birthday.day}
                                    month={this.state.birthday.month}
                                    year={this.state.birthday.year}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="interests"
                            >
                                <Form.Label>Interests:</Form.Label>
                                <Tags
                                    onChange={this.tagChange}
                                    tags={Interests}
                                    group="interests"
                                    onAsDefault={
                                        this.state.oldUserData.interests
                                    }
                                />
                            </Form.Group>

                            <Error errors={this.state.errors} />

                            <Button variant="info" type="submit">
                                Save edit
                            </Button>
                        </Form>
                    </>
                );
            }
            
            if (this.state.loaded) {
                if (!this.state.oldUserData) return (<span>can't find the user</span>);
                else return (<>{ EditUser() }</>);
            } else {
                return (<span>loading...</span>)
            }
        }

        return (
            <>
                { renderComponents() }
            </>
        );
    }
}

export default Edit;
