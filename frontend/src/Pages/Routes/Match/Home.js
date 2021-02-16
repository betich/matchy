import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import ProjectCard from '../../../Components/ProjectCard';

class Match extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            error: null,
            clickable: false,
            Project: null
        }

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleAcceptClick = this.handleAcceptClick.bind(this);
        this.getRandomProject = this.getRandomProject.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleError(err) {
        if (err.response) {
            if (err.response.status === 500) this.setState({ error: "internal server error" });
            else this.setState({ error: err.response.statusText });
        } else {
            this.setState({ error: "an unknown error occured" });
        }
        console.error("oh no", err);
    }

    getRandomProject() {
        axios.get("/app/match")
            .then((raw) => raw.data)
            .then((project) => this.setState({ Project: project }))
            .catch((err) => this.handleError(err))
            .finally(() => {
                this.setState({ clickable: true, loaded: true});
            });
    }

    handleNextClick(e) {
        this.setState({ clickable: false}, () => {
            this.getRandomProject();
        });
    }

    handleAcceptClick(e) {
        this.setState({ clickable: false}, () => {
            axios.post(`/app/match/apply/${this.state.Project._id}`)
                .then((res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        this.props.history.push(`/projects/${res.data._id}`);
                    }
                })
                .catch((err) => this.handleError(err))
                .finally(() => {
                    this.setState({ clickable: true, loaded: true});
                });
        });
    }

    componentDidMount() {
        this.getRandomProject();
    }

    render() {
        const renderComponents = () => {
            const MatchApp = () => {
                return (
                    <>
                        <Button variant="outline-success" onClick={this.handleAcceptClick} disabled={!this.state.clickable} className="mr-2">
                            {this.state.clickable ? "Accept" : "loading..."}
                        </Button>
                        <Button variant="outline-danger" onClick={this.handleNextClick} disabled={!this.state.clickable}>
                            {this.state.clickable ? "Next" : "loading..."}
                        </Button>
                        <ProjectCard project={this.state.Project} />
                    </>
                )
            }

            if (this.state.loaded) {
                if (this.state.error) return (<span>{this.state.error}</span>);
                else if (!this.state.Project) return (<span>There are no projects left to display</span>)
                else return (<> { MatchApp() } </>);
            } else {
                return (<span>loading...</span>)
            }
        }

        return (
            <>
                <h1>Match</h1>
                { renderComponents() }
            </>
        );
    }
}

export default Match;