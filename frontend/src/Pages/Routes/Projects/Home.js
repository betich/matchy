import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../../Components/Loading';

const ProjectCard = (props) => {
    return ( 
        <>
            <Card
                bg="white"
                text="black"
                style={{ width: '18rem' }}
                className="mb-2"
                >
                <Card.Header>{props.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.fullname}</Card.Title>
                    <Card.Text>
    
                    </Card.Text>
                </Card.Body>
                <Link to={`/users/${props.url}`} className="d-flex justify-content-center mb-3">
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
    let ProjectLinks = Projects.map((e) => <ProjectCard url={e._id} description={e.description} name={e.name} key={e._id} />);

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
        { !loaded ? (<Loading />) : (
        <>
            <h1>Projects</h1>
            <Link to="/projects/create">
                <Button variant="outline-danger" type="submit">
                    Create
                </Button>
            </Link>
            <div id="projectLinks">
                <h4>Project Links</h4>
                <div className="d-flex flew-wrap">
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