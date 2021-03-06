import React from "react";
import { Form, Col } from "react-bootstrap";
import Tags from "../Tag";
import Required from '../Required';
import { TagsList } from "../../Services/Mock";
import { CreateQA } from "../../Components/QAForm";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);

        let oldData = this.props.oldData;
        let questions = [];
        if (oldData) {
            questions = (oldData.questions) ? oldData.questions : []
        }
        // prettier-ignore
        this.state = ( oldData )
            ? {
                  projectname: oldData.name,
                  description: oldData.description,
                  tags: oldData.tags,
                  questions: questions,
              }
            : {
                  projectname: "",
                  description: "",
                  tags: [],
                  questions: [],
            };

        this.tagChange = this.tagChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.formQAChange = this.formQAChange.bind(this);
    }

    inputChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.props.inputChange(this.state);
        });
    }

    formQAChange(form) {
        this.setState({ questions: form }, () => {
            this.props.inputChange(this.state);
        });
    }

    tagChange(group, tags) {
        switch (group) {
            case "projectTags":
                this.setState({ tags: tags }, () => {
                    this.props.inputChange(this.state);
                });
                break;
            default:
                console.error("unknown tag group");
        }
    }

    render() {
        return (
            <>
                <Form.Row>
                    <Form.Group as={Col} sm={12}>
                        <Form.Label>Project name <Required /></Form.Label>
                        <Form.Control
                            name="projectname"
                            required
                            type="text"
                            placeholder="Example project"
                            value={this.state.projectname}
                            onChange={this.inputChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.inputChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12} className="mb-3">
                        <Form.Label className="display-block">Tags: <Required /></Form.Label>
                        <Tags
                            onChange={this.tagChange}
                            tags={TagsList}
                            group="projectTags"
                            onAsDefault={this.state.tags}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Question and Answer</Form.Label>
                    <CreateQA onChange={this.formQAChange} questions={this.state.questions}/>
                </Form.Group>
            </>
        );
    }
}

export default ProjectForm;
