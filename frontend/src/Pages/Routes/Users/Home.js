import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../../Components/Loading';

const UserLink = (props) => {
    return (
        <Link to={`/users/${props.url}`}>
            <Button variant="outline-info" type="submit">
                {props.name}
            </Button>
        </Link>
    );
}

const Index = (props) => {
    const [Users, setUsers] = useState([]);
    const [loaded, setLoad] = useState(false);
    let UserLinks = Users.map((e) => <UserLink url={e._id} name={e.username} key={e._id} />);

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
        { !loaded ? (<Loading />) : (
        <>
            <h1>Users</h1>
            <Link to="/users/create">
                <Button variant="outline-danger" type="submit">
                    Create
                </Button>
            </Link>
            <Link to="/users/edit">
                <Button variant="outline-danger" type="submit">
                    Edit
                </Button>
            </Link>
            <Link to="/users/delete">
                <Button variant="outline-danger" type="submit">
                    Delete
                </Button>
            </Link>
            <div id="userLinks">
                <h4>User Links</h4>
                {UserLinks}
            </div>
        </>
        )
        }
    </>
    );
}

export default Index;