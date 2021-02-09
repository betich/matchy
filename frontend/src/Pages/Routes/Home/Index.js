import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const LoggedIn = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        axios.get('/app/checkLogin')
            .then((res) => setResponse(res.status))
            .catch((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            setResponse(401);
                            break;
                        case 404:
                            setResponse(404);
                            break;
                        default:
                            setResponse(null);
                    }
                }
            })
    }, [])

    if (!response) return <span></span>;
    else if (response === 200) return (
        <Link to="/logout">
            <Button variant="outline-danger" type="submit">
                Logout
            </Button>
        </Link>
    );
    else if (response === 401) return (
        <Link to="/login">
            <Button variant="outline-danger" type="submit">
                Login
            </Button>
        </Link>
    );
}

const Home = () => {
    return (
        <div className="mt-3 ml-3">
            <h1>
                Welcome.
            </h1>
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