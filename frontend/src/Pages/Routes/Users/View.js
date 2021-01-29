import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Loading from '../../../Components/Loading';

const ViewUser = (props) => {
    const [User, setUser] = useState({});

    useEffect(() => {
        axios
        .get(`/app/users/${props.match.params.id}`)
        .then((res) => res.data)
        .then((user) => {
            setUser(user);
        })
        .catch((err) => console.error(err));
    });

    return (
        <>
        { User ? (<Loading />) : (
            <>
                <Card
                    bg="white"
                    text="black"
                    style={{ width: '18rem' }}
                    className="mb-2"
                    >
                    <Card.Header>{User.name.first + ' ' + User.name.last}</Card.Header>
                    <Card.Body>
                    <Card.Title>{User.username}</Card.Title>
                    <Card.Text>
                        interests: {User.interests.join(', ')}
                    </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )}
        </>
    );
}

export default ViewUser;