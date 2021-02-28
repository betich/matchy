import axios from 'axios';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import validate from "../../Services/Validate";
import Error from "../../Components/Error";
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
            
            axios.post('/app/register', data, options)
            .then((response) => {
                if (response.status === 200) {
                    this.props.history.push(`/users/${response.data.username}`);
                }
            }, (err) => {
                switch (err.response.status) {
                    case 409:
                        this.setState({ errors: {username: ['username taken']}});
                        break;
                    default:
                        console.log(err);
                }
            });
        } else {
            this.setState({ errors: invalidData });
        }
    }

    render() {
        return (
            <>
                <Link to="/">back</Link>
                <h1>Create User</h1>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <UserForm inputChange={this.handleInputChange} />
                    <Error errors={this.state.errors} />

                    <Button variant="info" type="submit">
                        Create
                    </Button>
                </Form>
            </>
        );
    }
}

export default Create;
