import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectCard = (props) => {
    const project = props.project

    return ( 
        <>
            <Card
                bg="white"
                text="black"
                style={{ width: '18rem' }}
                className="mb-2"
                >
                <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                    <Card.Text>
                    {project.tags.map((elem, i) => (
                        <Button
                            key={i}
                            variant="outline-danger"
                        >
                            {elem}
                        </Button>
                    ))}    
                    </Card.Text>
                </Card.Body>
                <Link to={`/projects/${props.url}`} className="d-flex justify-content-center mb-3">
                    <Button variant="outline-info" type="submit">
                        View
                    </Button>
                </Link>
            </Card>
        </>
        );
    }
    

const Index = (props) => {
    const [Projects, setProjects] = useState([]);
    const [loaded, setLoad] = useState(false);
    let ProjectLinks = Projects.map((e) => <ProjectCard url={e._id} project={e} key={e._id} />);

    useEffect(() => {
        axios
        .get(`/app/projects`)
        .then((res) => res.data)
        .then((projects) => {
            setProjects(projects);
        })
        .then(() => setLoad(true))
        .catch((err) => console.error("oh no", err))
    }, []);

    return (
    <>
        { loaded && (
        <>
            <h1>Projects</h1>
            <Link to="/projects/create">
                <Button variant="outline-danger" type="submit">
                    Create
                </Button>
            </Link>
            <div id="projectLinks">
                <h4>Project Links</h4>
                <div className="d-flex flex-wrap">
                    {ProjectLinks}
                </div>
            </div>
        </>
        )
        }
    </>
    );
}

export default Index;