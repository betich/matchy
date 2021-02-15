import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../../../Components/ProjectCard';

const Index = (props) => {
    const [Projects, setProjects] = useState([]);
    const [loaded, setLoad] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios
        .get(`/app/projects`)
        .then((res) => res.data)
        .then((projects) => {
            setProjects(projects);
        })
        .catch((err) => {
            if (err.response.data) {
                setError(err.response.data);
            } else {
                setError("an unknown error occured");
            }
            
            console.error("oh no", err)
        })
        .finally(() => setLoad(true))
    }, []);
    
    let ProjectLinks = Projects.map((project) => <ProjectCard project={project} key={project._id} />);
    return (
    <>
    { loaded && (
        <>
        { error ? <span>{error}</span>
        : (
        <>
            <h1>Projects</h1>
            <Link to="/projects/create">
                <Button variant="outline-danger" type="submit">
                    Create
                </Button>
            </Link>
            <div id="projectLinks">
                <h4>My Projects</h4>
                <div className="d-flex flex-wrap">
                    {ProjectLinks}
                </div>
            </div>
        </>
        )}
        </>
    )
    }
    </>
    );
}

export default Index;