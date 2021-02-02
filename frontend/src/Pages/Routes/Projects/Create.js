import axios from "axios";
import React from "react";
import Tags from '../../../Components/Tag';
import { Form, Button } from "react-bootstrap";
import { ProjectTags as TagsList } from "../../../Services/Mock";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        const name = data.get('projectName');
        const description = data.get('projectDescription');
        const tags = this.state.tags;
        
        let obj = {
            Name: name,
            Description: description,
            Tags: tags,
        };

        try {
            const response = await axios.post("/projects/new", {
                "Content-Type": "application/json",
                body: obj,
            });
            if (response.status === 200) {
                this.props.history.push(`/projects/view/${response.data.id}`);
            }
        } catch (e) {
            console.log(e);
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
                <h1>Create Form</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Project name</Form.Label>
                        <Form.Control
                            name="projectName"
                            required
                            type="text"
                            placeholder="Example project"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="projectDescription"
                            placeholder="Description"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tags:</Form.Label>
                        <Tags onChange={this.tagChange} tags={TagsList} group="projectTags" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </>
        );
    }
}

export default Create;
