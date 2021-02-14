import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";

const Matching = () => {
    const [loaded, setLoaded] = useState(false);
    const [Project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [clickable, setClickable] = useState(false);

    const handleClick = (e) => {
         const handleError = (err) => {
            if (err.response.data) {
                if (err.response.status === 404) return;
                setError(err.response.data);
            } else {
                setError("an unknown error occured");
            }
            console.error("oh no", err);
        };
        setClickable(false);
        axios
            .get("/app/match")
            .then((raw) => raw.data)
            .then((project) => setProject(project))
            .then(() => setClickable(true))
            .catch((err) => handleError(err))
            .finally(() => setLoaded(true));

    }

    useEffect(() => {
        const handleError = (err) => {
            if (err.response.data) {
                if (err.response.status === 404) return;
                setError(err.response.data);
            } else {
                setError("an unknown error occured");
            }
            console.error("oh no", err);
        };

        axios
            .get("/app/match")
            .then((raw) => raw.data)
            .then((project) => setProject(project))
            .then(() => setClickable(true))
            .catch((err) => handleError(err))
            .finally(() => setLoaded(true));
    }, []);

    return (
        <>
        { loaded && (
            <>
            { error ? <span>{error}</span>
            : (
            <>
                <Container>
                    <Card
                        bg="white"
                        text="black"
                        style={{ width: '18rem' }}
                        className="mb-2"
                        >
                        <Card.Body>
                            <Card.Title>{Project.name}</Card.Title>
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
                </Container>
                <Button variant="primary" onClick={handleClick} disabled={!clickable}>
                    Next
                </Button>
            </>
            )}
            </>
        )}
        </>
    );
};

export default Matching;
