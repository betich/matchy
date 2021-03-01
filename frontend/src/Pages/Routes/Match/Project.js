import React from 'react';
import { Button, Card } from 'react-bootstrap';

const ViewProject = (props) => {
    const Project = props.project;
    const Owner = Project.owner;
    const Workers = Project.workers;

    return (
        <>
            <Card
                bg="white"
                text="black"
                style={{ width: "18rem" }}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title>{Project.name}</Card.Title>
                    <Card.Text>by {Owner.username}</Card.Text>
                    <Card.Text>{Project.description}</Card.Text>
                    <Card.Text>
                        employees:{" "}
                        {Workers.map((e) => e.username).join(", ")}
                    </Card.Text>
                    <Card.Text>tags:</Card.Text>
                    <Card.Text>
                        {Project.tags.map((elem, i) => (
                            <Button key={i} variant="outline-danger">
                                {elem}
                            </Button>
                        ))}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default ViewProject;