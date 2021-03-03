import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import validate from "../../../Services/Validate";
import Error from "../../../Components/Error";
import ProjectForm from "../../../Components/Form/Project";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errors: {},
            loaded: false,
            oldProject: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleInputChange(formData) {
        this.setState({ data: formData });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        const data = this.state.data;

        let { valid, invalidData } = validate(data);

        if (valid) {
            const options = {
                headers: { "Content-Type": "application/json" },
            };
            axios.put(`/app/projects/${this.props.match.params.id}`, data, options).then(
                (res) => {
                    if (res.status === 200) {
                        window.flash(`Edited ${res.data.name}`, 'success');
                        this.props.history.push(
                            `/projects/${res.data.owner}/${res.data.newurl}`
                        );
                    }
                },
                (err) => {
                    window.flash('An error occured', 'error');
                    console.error(err);
                }
            );
        } else {
            this.setState({ errors: invalidData });
        }
    }

    render() {
        const renderComponents = () => {
            const EditProject = () => {
                return (
                    <>
                        <Link to={`/projects/i/${this.state.oldProject._id}`}>back</Link>
                        <h1>Edit Project</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <ProjectForm inputChange={this.handleInputChange} oldData={this.state.oldProject} />
                            <Error errors={this.state.errors} />
                
                            <Button variant="info" type="submit">
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
