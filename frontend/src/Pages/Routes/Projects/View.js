import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../../Components/Loading";

const EditSection = (props) => {
    return (
        <Link to={`/projects/edit/${props.id}`}>
            <Button>Edit</Button>
        </Link>
    )
}

const DeleteSection = (props) => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleClick = async (e) => {
        if (confirmed === false) {
            setShow(true);
            setDisable(true);
        } else {
            try {
                axios.delete(`/app/projects/${props.id}`)
                .then(response => {
                    if (response.status === 200) {
                        history.push("/projects");
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (e) => {
        if ( e.target.value === props.confirmationText) {
            setDisable(false);
            setConfirmed(true);
        } else {
            setDisable(true);
            setConfirmed(false);
        }
    }
    return (
        <div>
            <Button onClick={handleClick} disabled={disable}>Delete</Button>
            { show && (
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter project's name and hit Delete again</Form.Label>
                        <Form.Control autoFocus onChange={handleChange} name="confirmationtext"></Form.Control>
                    </Form.Group>
                </div>
            )
            }
        </div>
    );
};

const View = (props) => {
    const [Project, setProject] = useState(null);
    const [loaded, setLoad] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get(`/app/projects/${props.match.params.id}`)
        .then((res) => res.data)
        .then((project) => {
            setProject(project);
        })
        .catch((err) => {
            if (err.response) {
                switch (err.response.status) {
                    case 401:
                        setError('You aren\'t allowed to view this page');
                        return;
                    case 404:
                        setError('Can\'t find the Project lol');
                        return;
                    default:
                        break;
                }
            }
            console.error("oh no", err);
        })
        .finally(() => setLoad(true));
    }, [props.match.params.id]);

    return (
        <>
        { !loaded ? (<Loading />) : 
            (!Project)
                ? (<span>{error}</span>) : (
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
                            <Card.Text>{Project.description}</Card.Text>
                        </Card.Body>
                    </Card>
                    <DeleteSection id={props.match.params.id} confirmationText={Project.name} />
                    <EditSection id={props.match.params.id} />
                </>
            )}
        </>
    );
};

export default View;
