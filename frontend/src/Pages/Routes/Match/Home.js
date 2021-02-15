import axios from "axios";
import React from "react";
import { Card, Button } from "react-bootstrap";

const ProjectCard = (props) => {
    const Project = props.project;
    const Owner = props.owner;

    const renderCard = () => {
        if (Project && Owner) {
            return (
                <Card
                    bg="white"
                    text="black"
                    style={{ width: '18rem' }}
                    className="mb-2"
                    >
                    <Card.Body>
                        <Card.Title>{Project.name}</Card.Title>
                        <Card.Text>by {Owner.username}</Card.Text>
                        <Card.Text>{Project.description}</Card.Text>
                        <Card.Text>tags:</Card.Text>
                        <Card.Text>
                        {Project.tags.map((elem, i) => (
                            <Button
                                key={i}
                                variant="outline-danger"
                            >
                                {elem}
                            </Button>
                        ))}    
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        }
        else {
            return (<span>can't display the project</span>)
        }
    }

    return (
        <>
        { renderCard() }
        </>
    )
}

class Match extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            error: null,
            clickable: false,
            Project: null,
            Owner: null
        }

        this.handleClick = this.handleClick.bind(this);
        this.getRandomProject = this.getRandomProject.bind(this);
    }

    async getRandomProject() {
        const handleError = (err) => {
            if (err.response.data) {
                this.setState({ error: err.response.data });
            } else {
                this.setState({ error: "an unknown error occured" });
            }
            console.error("oh no", err);
        };

        await axios.get("/app/match")
            .then((raw) => raw.data)
            .then((project) => this.setState({ Project: project }))
            .catch((err) => handleError(err))

        if (this.state.Project) {
            await axios.get(`/app/users/id/${this.state.Project.owner}`)
                .then((raw) => raw.data)
                .then((user) => this.setState({ Owner: user }))
                .catch((err) => handleError(err))
                .finally(() => {
                    this.setState({ clickable: true, loaded: true});
                });
        }
    }

    handleClick(e) {
        this.setState({ clickable: false}, () => {
            this.getRandomProject();
        });
    }

    componentDidMount() {
        this.getRandomProject();
    }

    render() {
        return (
            <>
            { this.state.loaded && (
                <>
                { this.state.error ? <span>{this.state.error}</span>
                : (
                <>
                    <ProjectCard project={this.state.Project} owner={this.state.Owner} />
                    <Button variant="outline-info" onClick={this.handleClick} disabled={!this.state.clickable}>
                        Next
                    </Button>
                </>
                )}
                </>
            )}
            </>
        );
    }
}

export default Match;