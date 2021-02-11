import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import isLoggedIn from '../../../Services/isLoggedIn';

const Login = () => {
    return (
        <Link to="/login">
            <Button variant="outline-danger" type="submit">
                Login
            </Button>
        </Link>
    )
}

const Logout = () => {
    return (
        <Link to="/logout">
            <Button variant="outline-danger" type="submit">
                Logout
            </Button>
        </Link>
    )
}

const LoggedIn = (props) => {
    const [status, setStatus] = useState(null);
    const [User, setUser] = useState(null);
    const [loaded, setLoad] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            let [loggedIn, status, user] = await isLoggedIn();
            if (loggedIn) setUser(user);
            setStatus(status);
            setLoad(true);
        }
        getUser();
    }, [])

    return (
        <>
        { loaded ? (
            <>
                <h1>
                    Welcome, {User ? User.username : "please sign in"}!
                </h1>
                {
                    (status === 200) ?
                        <Logout />
                    : (status === 401) ?
                        <Login />
                    : <span></span>
                }
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