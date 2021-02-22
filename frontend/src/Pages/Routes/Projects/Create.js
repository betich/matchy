import axios from 'axios';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Tags from '../../../Components/Tag';
import { ProjectTags as TagsList } from "../../../Services/Mock";
import QAForm from "../../../Components/QAForm"
import validate from "../../../Services/Validate";
import Error from "../../../Components/Error";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            questions: [],
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}});
        const data = new FormData(e.target);

        for ( let i = 0; i < this.state.tags.length; i++ ) {
            data.append('tags[]', this.state.tags[i]);
        }

        for ( let i = 0; i < this.state.questions.length; i++ ) {
            data.append('formquestions[]', JSON.stringify(this.state.questions[i]));
        }

        let { valid, invalidData } = validate(data);
        
        if (this.state.tags.length === 0) {
            valid = false;
            invalidData["tags"] = ['at least one tag is required'];
        }

        if (valid) {
            const options = {
                headers: {'Content-Type': 'multipart/form-data' }
            };
            
            axios.post('/app/projects', data, options)
                .then((res) => {
                    if (res.status === 200) {
                        this.props.history.push(
                            `/projects/${res.data.owner.username}/${res.data.url}`
                        );
                    }
                })
                .catch((err) => {
                    switch (err.response.status) {
                        case 409:
                            this.setState({ errors: {projectname: ['project name taken']}});
                            break;
                        default:
                            console.error(err);
                    }
                });
        } else {
            this.setState({ errors: invalidData });
        }
    }

    tagChange(group, tags) {
        switch (group) {
            case 'projectTags':
                this.setState({ tags: tags })
                break;
            default:
                console.error('unknown tag group');
        }
    }

    handleFormChange(Formdata) {
        this.setState({questions: Formdata});
    }

    render() {
        return (
            <>
                <Link to="/projects">back</Link>
                <h1>Create a Project</h1>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <Form.Group>
                        <Form.Label>Project name</Form.Label>
                        <Form.Control
                            name="projectname"
                            required
                            type="text"
                            placeholder="Example project"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            placeholder="Description"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tags:</Form.Label>
                        <Tags onChange={this.tagChange} tags={TagsList} group="projectTags" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Question and Answer</Form.Label>
                        <QAForm type="create" onChange={this.handleFormChange} />
                    </Form.Group>

                    <Error errors={this.state.errors} />

                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </>
        );
    }
}

export default Create;
