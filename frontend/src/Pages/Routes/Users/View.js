import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../../Components/Loading';

const ViewUser = (props) => {
    const [User, setUser] = useState({});
    const [loaded, setLoad] = useState(false); 

    useEffect(() => {
        axios
        .get(`/app/users/${props.match.params.id}`)
        .then((res) => res.data)
        .then((user) => {
            setUser(user);
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
            (Object.keys(User).length === 0 && User.constructor === Object) ? (<span>Can't find the User lol</span>) : (
            <>
                <Link to="/users">Back</Link>
                <Card
                    bg="white"
                    text="black"
                    style={{ width: '18rem' }}
                    className="mb-2"
                    >
                    <Card.Header>{User.fullname}</Card.Header>
                    <Card.Body>
                        <Card.Title>{User.username}</Card.Title>
                        <Card.Text>
                            interests: {User.interests.map((elem, i) => <Button key={i} variant="outline-danger">{elem}</Button>)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
            )
        }
        </>
    );
}

export default ViewUser;