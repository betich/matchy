import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { ProjectTags as TagsList } from "../../../Services/Mock";

const CheckBox = (props) => {
    return (
        <div style={props.style}>
            <label>{props.children}</label>
            <input type="checkbox" name={props.name} />
        </div>
    );
};

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        const name = data.get('projectName');
        const description = data.get('projectDescription');
        let tags = [];
        data.forEach((key,value) => {
            if (key === 'on') {
                tags.push(value);
            }
        })
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
            console.log(response);
            if (response.status === 200) {
                this.props.history.push(`/projects/view/${response.data.id}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const TagButtons = TagsList.map((item, i) => {
            return (
                <CheckBox
                    name={item}
                    key={i}
                    style={{ display: "inline-block", padding: "5px" }}
                >
                    {item}
                </CheckBox>
            );
        });

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
                        <div>{TagButtons}</div>
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
