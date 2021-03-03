import axios from 'axios';
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import validate from "../../Services/Validate";
import Error from "../../Components/Error";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        const { valid, invalidData } = validate(data);
        
        if (valid) {
            const options = {
                headers: { 'Content-Type': 'application/json' }
            };

            const request = {
                login: data.get('login'),
                password: data.get('password')
            }
            
            axios.post('/app/login', JSON.stringify(request), options)
            .then((response) => {
                if (response.status === 200) {
                    window.flash('Login successful', 'success');
                    this.props.history.push("/");
                }
            }, (err) => {
                switch (err.response.status) {
                    case 401:
                        this.setState({ errors: { login: ["Wrong username or password"] } });
                        break;
                    case 404:
                        this.setState({ errors: { login: ["Can't make the request now"] } });
                        window.flash('An unknown error occured', 'error');
                        break;
                    default:
                        this.setState({ errors: { login: ["An unknown error occured"] } });
                        window.flash('An unknown error occured', 'success');
                }
            });
        } else {
            this.setState({ errors: invalidData });
        }
    }

    render() {
        return (
            <Container className="mt-3">
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <Form.Group controlId="login">
                        <Form.Control required autoFocus name="login" placeholder="Username/Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control required name="password" type="password" placeholder="Password" />
                    </Form.Group>

                    <Error errors={this.state.errors} />

                    <Button variant="info" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Login;