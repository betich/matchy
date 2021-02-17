import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Tags from '../../../Components/Tag';
import { Form, Button } from "react-bootstrap";
import { ProjectTags as TagsList } from "../../../Services/Mock";
import validate from "../../../Services/Validate";
import Error from "../../../Components/Error";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            questions: [],
            errors: {},
            loaded: false,
            oldProject: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        const data = new FormData(e.target);

        for (let i = 0; i < this.state.tags.length; i++) {
            data.append("tags[]", this.state.tags[i]);
        }

        let { valid, invalidData } = validate(data);

        if (this.state.tags.length === 0) {
            valid = false;
            invalidData["tags"] = ['at least one tag is required'];
        }

        if (valid) {
            const options = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            axios.put(`/app/projects/${this.props.match.params.id}`, data, options).then(
                (res) => {
                    if (res.status === 200) {
                        this.props.history.push(
                            `/projects/${res.data.owner}/${res.data.newurl}`
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

    tagChange(group, tags) {
        switch (group) {
            case "projectTags":
                this.setState({ tags: tags });
                break;
            default:
                console.error("unknown tag group");
        }
    }

    componentDidMount() {
        axios.get(`/app/projects/i/${this.props.match.params.id}`)
            .then((res) => res.data)
            .then((project) => {
                this.setState({ oldProject: project });
                this.setState({ tags: project.tags });
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => this.setState({ loaded: true }));
    }

    render() {
        const renderComponents = () => {
            const EditProject = () => {
                return (
                    <>
                        <Link to={`/projects/i/${this.state.oldProject._id}`}>back</Link>
                        <h1>Edit Project</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Project name</Form.Label>
                                <Form.Control
                                    name="projectname"
                                    required
                                    type="text"
                                    placeholder="Example project"
                                    defaultValue={this.state.oldProject.name}
                                />
                            </Form.Group>
                
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name="description"
                                    placeholder="Description"
                                    defaultValue={this.state.oldProject.description}
                                />
                            </Form.Group>
                
                            <Form.Group className="mb-3">
                                <Form.Label>Tags:</Form.Label>
                                <Tags
                                    onChange={this.tagChange}
                                    tags={TagsList}
                                    group="projectTags"
                                    onAsDefault={this.state.oldProject.tags}
                                />
                            </Form.Group>
                
                            <Error errors={this.state.errors} />
                
                            <Button variant="primary" type="submit">
                                Save Edit
                            </Button>
                        </Form>
                    </>
                );
            }
            
            if (this.state.loaded) {
                if (!this.state.oldProject) return (<span>can't find the project</span>);
                else return (<>{ EditProject() }</>);
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
