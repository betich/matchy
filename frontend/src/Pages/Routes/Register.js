import axios from 'axios';
import React from 'react';
import { Form } from 'react-bootstrap';
import validate from "../../Services/Validate";
import UserForm from "../../Components/Form/User";

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateData = this.validateData.bind(this);
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
        const data = this.state.data;

        const { valid, invalidData } = validate(data);

        if (valid) {
            const options = {
                headers: { "Content-Type": "application/json" },
            };
            
            axios.post('/app/register', data, options)
            .then((response) => {
                if (response.status === 200) {
                    window.flash(`Successfully registered ${response.data.username}`, 'success');
                    this.props.history.push(`/users/${response.data.username}`);
                }
            }, (err) => {
                switch (err.response.status) {
                    case 409:
                        this.setState({ errors: {username: ['username taken']}});
                        break;
                    default:
                        window.flash('An error occured', 'error');
                }
            });
        } else {
            this.setState({ errors: invalidData });
        }
    }

    render() {
        return (
            <>
                <h1>Create User</h1>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <UserForm
                        inputChange={this.handleInputChange}
                        errors={this.state.errors}
                        validate={this.validateData}
                    />
                </Form>
            </>
        );
    }
}

export default Create;
