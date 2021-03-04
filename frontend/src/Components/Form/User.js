import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import Tags from '../Tag';
import ExperienceGroup from '../ExpandableFields';
import DatePicker from '../DatePicker';
import Error from "../Error";
import Required from '../Required';
import { TagsList as Interests, EducationOptions } from '../../Services/Mock';

const PageOne = (props) => {
    const UserNamePassword = () => {
        if (!props.edit) {
            return (
                <>
                    <Form.Row>
                        <Form.Group as={Col} sm={12} controlId="username">
                            <Form.Label>Username <Required /></Form.Label>
                            <Form.Control
                                required
                                autoFocus
                                name="username"
                                placeholder="Username"
                                onChange={props.inputChange}
                                value={props.data.username}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} sm={12} controlId="email">
                            <Form.Label>Email <Required /></Form.Label>
                            <Form.Control
                                required
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={props.inputChange}
                                value={props.data.email}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} sm={12} controlId="password">
                            <Form.Label>Password <Required /></Form.Label>
                            <Form.Control
                                required
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={props.inputChange}
                                value={props.data.password}
                            />
                        </Form.Group>
                    </Form.Row>
                </>
            );
        }
    }

    return (
            <>
                <Form.Row>
                    <Form.Group as={Col} sm={12} controlId="fullname">
                        <Form.Label>Full name <Required /></Form.Label>
                        <Form.Control
                            required
                            name="fullname"
                            placeholder="Full Name"
                            onChange={props.inputChange}
                            value={props.data.fullname}
                        />
                    </Form.Group>
                </Form.Row>

                { UserNamePassword() }

                <Form.Row>
                    <Form.Group as={Col} sm={12} controlId="birthday">
                        <Form.Label>Birthday <Required /></Form.Label>
                        <DatePicker
                            onChange={props.handleBirthday}
                            day={props.data.birthday.day}
                            month={props.data.birthday.month}
                            year={props.data.birthday.year}
                        />
                    </Form.Group>
                </Form.Row>
        </>
    );
}

const PageTwo = (props) => {
    return (
        <>
            <Form.Row>
                <Form.Group as={Col} sm={12} className="mb-3" controlId="education">
                    <Form.Label>Education</Form.Label>
                    <ExperienceGroup
                        type="select"
                        name="education"
                        onChange={props.setInfo}
                        options={EducationOptions}
                        defaultValue={props.data.experiences.education}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} sm={12} className="mb-3" controlId="work">
                    <Form.Label>Work</Form.Label>
                    <ExperienceGroup
                        type="input"
                        name="work"
                        onChange={props.setInfo}
                        defaultValue={props.data.experiences.work}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} sm={12} className="mb-3" controlId="interests">
                    <Form.Label>Interests</Form.Label>
                    <Tags
                        onChange={props.tagChange}
                        tags={Interests}
                        group="interests"
                        onAsDefault={props.data.interests}
                    />
                </Form.Group>
            </Form.Row>
        </>
    );
}

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        let oldData = this.props.oldData;
        let data = (oldData) ? {
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

        this.state = {
            data: data,
            page: 1
        }

        this.tagChange = this.tagChange.bind(this);
        this.setInfo = this.setInfo.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
    }

    tagChange(group, tags) {
        switch (group) {
            case "interests":
                this.setState({data: { ...this.state.data, interests: tags }}, () => {
                    this.props.inputChange(this.state.data);
                });
                break;
            default:
                console.error("unknown tag group");
        }
    }

    setInfo(type, fields) {
        this.setState({
            data: { ...this.state.data, experiences: { ...this.state.experiences, [type]: fields }},
        }, () => {
            this.props.inputChange(this.state.data);
        });
    }

    handleBirthday(date) {
        this.setState({data: { ...this.state.data, birthday: date }}, () => {
            this.props.inputChange(this.state.data);
        });
    }

    inputChange(e) {
        this.setState({data: { ...this.state.data, [e.target.name]: e.target.value }}, () => {
            this.props.inputChange(this.state.data);
        });
    }

    _next() {
        if (this.props.validate(this.state.data)) {
            this.setState({ page: this.state.page+1 });
        }
    }

    _prev() {
        if (this.props.validate(this.state.data)) {
            this.setState({ page: this.state.page-1 });
        }
    }

    render() {
        const RenderPage = () => {
            switch (this.state.page) {
                case 1:
                    return (
                    <>
                        <PageOne
                            data={this.state.data}
                            inputChange={this.inputChange}
                            handleBirthday={this.handleBirthday}
                            edit={this.props.edit}
                        />
                        <Error errors={this.props.errors} />
                        <Button variant="outline-info" onClick={this._next}>
                            Next
                        </Button>
                    </>
                    );
                case 2:
                    return (
                    <>
                        <PageTwo
                            data={this.state.data}
                            tagChange={this.tagChange}
                            setInfo={this.setInfo}
                            edit={this.props.edit}
                        />
                        <Error errors={this.props.errors} />
                        <Button variant="outline-info" onClick={this._prev}>
                            Back
                        </Button>
                        <Button variant="info" type="submit">
                            {(this.props.edit) ? "Save Edit" : "Create"}
                        </Button>
                    </>
                    );
                default:
                    return (<span>Can't find the current page</span>)                      
            }
        }
        
        return (
        <>{ RenderPage() }</>
        );
    }
}

/*

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

                { UserNamePassword() }

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

                <Error errors={this.props.errors} />

                <Button variant="info" type="submit">
                    {(this.props.edit) ? "Save Edit" : "Create"}
                </Button>
            </>
        );
    }
}

*/

export default UserForm;