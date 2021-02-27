import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import validate from "../../../Services/Validate";
import Error from "../../../Components/Error";
import UserForm from "../../../Components/Form/User";

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {},
            oldUserData: null,
            loaded: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/app/users/${this.props.match.params.username}`)
            .then((res) => res.data)
            .then((user) => {
                this.setState({ oldUserData: user });
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => this.setState({ loaded: true }));
    }

    handleInputChange(formData) {
        this.setState({ data: formData });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = this.state.data;

        const { valid, invalidData } = validate(data);

        if (valid) {
            const options = {
                headers: { "Content-Type": "application/json" },
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

    render() {
        const renderComponents = () => {
            const EditUser = () => {
                return (
                    <>
                        <Link to={`/users/${this.state.oldUserData.username}`}>back</Link>
                        <h1>Edit user information</h1>
                        <Form onSubmit={this.handleSubmit} noValidate>
                            <UserForm inputChange={this.handleInputChange} oldData={this.state.oldUserData} />

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
