import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../../Components/Loading';

const ProjectLink = (props) => {
    return (
        <Link to={`/projects/${props.url}`}>
            <Button variant="outline-info" type="submit">
                {props.name}
            </Button>
        </Link>
    );
}

const Index = (props) => {
    const [Projects, setProjects] = useState([]);
    const [loaded, setLoad] = useState(false);
    let ProjectLinks = Projects.map((e) => <ProjectLink url={e._id} name={e.name} key={e._id} />);

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
            <Link to="/projects/edit">
                <Button variant="outline-danger" type="submit">
                    Edit
                </Button>
            </Link>
            <Link to="/projects/delete">
                <Button variant="outline-danger" type="submit">
                    Delete
                </Button>
            </Link>
            <div id="projectLinks">
                <h4>Project Links</h4>
                {ProjectLinks}
            </div>
        </>
        )
        }
    </>
    );
}

export default Index;