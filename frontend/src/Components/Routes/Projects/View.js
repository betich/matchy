import React from 'react'
import { Card, Container } from 'react-bootstrap'

const View = (props) => {

    if (isNaN(props.match.params.id)) {
        return (
            <Container className="mt-3">
                <Card
                    bg="info"
                    text="white"
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>Error</Card.Header>
                    <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
    
    return (
        <Container className="mt-3">
            <Card
                bg="info"
                text="white"
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header>Something</Card.Header>
                <Card.Body>
                <Card.Title>YOYO {props.match.params.id}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default View;