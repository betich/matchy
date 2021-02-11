import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = (props) => {
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
    const [Users, setUsers] = useState([]);
    const [loaded, setLoad] = useState(false);
    let UserCardList = Users.map((e) => <UserCard url={e._id} name={e.username} key={e._id} fullname={e.fullname}/>);

    useEffect(() => {
        axios
        .get(`/app/users`)
        .then((res) => res.data)
        .then((users) => {
            setUsers(users);
        })
        .then(() => setLoad(true))
        .catch((err) => console.error("oh no", err))
    }, []);

    return (
    <>
        { loaded && (
        <>
            <h1>Users</h1>
            <Link to="/users/edit">
                <Button variant="outline-danger" type="submit">
                    Edit
                </Button>
            </Link>
            <div id="projectLinks">
                <h4>Project Links</h4>
                <div className="d-flex flex-wrap">
                    {UserCardList}
                </div>
            </div>
        </>
        )
        }
    </>
    );
}

export default Index;