import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const EditSection = (props) => {
    return (
        <Link to={`/users/${props.username}/edit`}>
            <Button className="button-group" variant="outline-success">Edit</Button>
        </Link>
    )
} 

const DeleteSection = (props) => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleClick = async (e) => {
        if (confirmed === false) {
            setShow(true);
            setDisable(true);
        } else {
            try {
                axios.delete(`/app/users/${props.username}`).then((response) => {
                    if (response.status === 200) {
                        history.push("/users");
                    }
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (e) => {
        if (e.target.value === props.username) {
            setDisable(false);
            setConfirmed(true);
        } else {
            setDisable(true);
            setConfirmed(false);
        }
    };

    return (
        <>
            <Button onClick={handleClick} className="button-group" disabled={disable} variant="outline-danger">
                Delete
            </Button>
            {show ? (
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Enter User's name and hit Delete again
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            onChange={handleChange}
                            name="confirmationtext"
                        ></Form.Control>
                    </Form.Group>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

const UserCard = (props) => {
    const user = props.user;
    const displayExpFields = () => {
        var expFields = {
            education: [],
            work: []
        };

        const exp = user.experiences;
        
        for (const e in exp) {
            if (exp.hasOwnProperty(e) && (e === "education" || e === "work")) {
                expFields[e] = exp[e];
            }
        }

        return (
        <>
            <p>Education:</p>
            {expFields["education"].map((e, i) => <p key={i}>{`${e.title}: ${e.value}`}</p>)}
            <p>Work:</p>    
            {expFields["work"].map((e, i) => <p key={i}>{`${e.title}: ${e.value}`}</p>)}
        </>
        )
    }

    return (
        <div className="info">
            <h1>{user.username}</h1>
            <p>Full Name: {user.fullname}</p>
            <p>Email: {user.email}</p>
            <p>Birthday: {`${user.birthday.day}/${user.birthday.month}/${user.birthday.year}`}</p>
            <p>Interests:</p>
            <div>
            {user.interests.map((elem, i) => (
                <Button
                    key={i}
                    variant="outline-earthbrown"
                    className="button-group"
                >
                    {elem}
                </Button>
            ))}
            </div>
            {displayExpFields()}
        </div>
    );
}

const View = (props) => {
    const [User, setUser] = useState(null);
    const [loaded, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const handleError = (err) => {
            // 401, 403s are expected
            if (err.response) {
                if (err.response.status === 403) return;
                else if (err.response.status === 500) setError("internal server error");
                else setError(err.response.data);
            } else {
                setError("an unknown error occured");
            }
            setAuthorized(false);
            console.error("oh no", err);
        };

        const checkOwnership = () => {
            return axios.get(`/app/users/checkownership/${props.match.params.username}`)
                .then(response => response.data)
                .then(user => user)
                .then(() => setAuthorized(true))
                .catch(handleError)
        }

        axios.get(`/app/users/${props.match.params.username}`)
            .then(response => response.data)
            .then(user => setUser(user))
            .then(checkOwnership)
            .catch(handleError)
            .finally(() => setLoad(true));
    }, [props.match.params.username]);

    
    const renderComponents = () => {
        const DisplayUser = () => {
            return (
            <>
                <UserCard user={User} />
                <hr />
                { authorized && (
                <div>
                    <EditSection username={props.match.params.username} />
                    <DeleteSection
                        username={User.username}
                    />
                </div>
                )}
            </>
            )
        }
        
        if (loaded) {
            if (error) return (<span>{error}</span>)
            else return (<> { DisplayUser() } </>);
        } else {
            return (<span>loading...</span>)
        }
    }

    return (
        <>
            { renderComponents() }
        </>
    );
};

export default View;
