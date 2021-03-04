import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import validate from "../../../Services/Validate";
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
        this.validateData = this.validateData.bind(this);
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

    validateData(data) {
        const { valid, invalidData } = validate(data);

        if (valid) {
            this.setState({ errors: {} });
            return true;
        } else {
            this.setState({ errors: invalidData });
            return false;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        let data = this.state.data;
        delete data["username"];
        delete data["password"];

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
                        <h1>Edit user information</h1>
                        <Form onSubmit={this.handleSubmit} noValidate>
                            <UserForm
                                inputChange={this.handleInputChange}
                                oldData={this.state.oldUserData}
                                edit={true}
                                errors={this.state.errors}
                                validate={this.validateData}
                            />
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
