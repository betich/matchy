import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../../Components/Loading';

const Index = (props) => {
    const [linkID, setLinkID] = useState('');

    const getData = () => {
        axios
        .get(`/app/users`)
        .then((res) => res.data)
        .then((users) => {
            setLinkID(users[0]._id);
        })
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        getData();
    });

    return (
    <>
        { !linkID ? (<Loading />) : (
        <>
            <h1>Users</h1>
            <Link to="/users/create">
                <Button variant="outline-danger" type="submit">
                    Create
                </Button>
            </Link>
            <Link to={`/users/${linkID}`}>
                <Button variant="outline-danger" type="submit">
                    View
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
        </>
        )
        }
    </>
    );
}

export default Index;