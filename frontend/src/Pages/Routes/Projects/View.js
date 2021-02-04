import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../../Components/Loading';

const View = (props) => {
    const [Project, setProject] = useState({});
    const [loaded, setLoad] = useState(false); 

    useEffect(() => {
        axios
        .get(`/app/projects/${props.match.params.id}`)
        .then((res) => res.data)
        .then((project) => {
            setProject(project);
        })
        .then(() => setLoad(true))
        .catch((err) => {
            console.error("oh no", err);
            setLoad(true);
        });
    }, [props.match.params.id]);

    return (
        <>
        { !loaded ? (<Loading />) : 
            (Object.keys(Project).length === 0 && Project.constructor === Object) ? (<span>Can't find the Project lol</span>) : (
            <>
                <Link to="/projects">Back</Link>
                <Card
                    bg="white"
                    text="black"
                    style={{ width: '18rem' }}
                    className="mb-2"
                    >
                    <Card.Header>Project</Card.Header>
                    <Card.Body>
                        <Card.Title>{Project.name}</Card.Title>
                        <Card.Text>
                            {Project.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
            )
        }
        </>
    );
}

export default View;