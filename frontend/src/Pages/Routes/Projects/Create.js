import axios from "axios";
import React from "react";
import Tags from '../../../Components/Tag';
import { Form, Button } from "react-bootstrap";
import { ProjectTags as TagsList } from "../../../Services/Mock";
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
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}});
        const data = new FormData(e.target);

        for ( let i = 0; i < this.state.tags.length; i++ ) {
            data.append('tags[]', this.state.tags[i]);
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
            .then((response) => {
                if (response.status === 200) {
                    this.props.history.push(`/projects/${response.data._id}`);
                }
            }, (err) => {
                console.error(err);
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

    render() {
        return (
            <>
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
