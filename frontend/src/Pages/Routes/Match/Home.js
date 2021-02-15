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
            .finally(() => {
                this.setState({ clickable: true, loaded: true});
            });
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
        const renderComponents = () => {
            const MatchApp = () => {
                return (
                    <>
                        <ProjectCard project={this.state.Project} />
                        <Button variant="outline-info" onClick={this.handleClick} disabled={!this.state.clickable}>
                            Next
                        </Button>
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