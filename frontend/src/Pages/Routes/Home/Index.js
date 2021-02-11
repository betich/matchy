import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const LoggedIn = (props) => {
    const [response, setResponse] = useState(null);
    const [User, setUser] = useState(null);

    useEffect(() => {
        axios.get('/app/checkLogin')
            .then((res) => {
                setResponse(res.status);
                return res.data
            })
            .then((userData) => setUser(userData))
            .catch((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            setResponse(401);
                            return;
                        case 404:
                            setResponse(404);
                            return;
                        default:
                            break;
                    }
                }
                console.error("oh no", err);
            })
    }, [])

    var AuthButton;
    if (!response) AuthButton = (<span></span>);
    else if (response === 200) {
        AuthButton = (
            <Link to="/logout">
                <Button variant="outline-danger" type="submit">
                    Logout
                </Button>
            </Link>
        )
    }
    else if (response === 401) {
        AuthButton = (
            <Link to="/login">
                <Button variant="outline-danger" type="submit">
                    Login
                </Button>
            </Link>
        )
    }

    return (
        <>
        { User ? (
            <>
                <h1>
                    Welcome, {User.username}!
                </h1>
                {AuthButton}
            </>
            )
            : <></> 
        }
        </>
    )
}

const Home = () => {
    return (
        <div className="mt-3 ml-3">
            <LoggedIn />
            <Link to="/signup">
                <Button variant="outline-danger" type="submit">
                    Sign up
                </Button>
            </Link>
        </div>
    )
}

export default Home;