import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const EditSection = (props) => {
    return (
        <Link to={`/users/${props.username}/edit`}>
            <Button variant="outline-info">Edit</Button>
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
        <div>
            <Button onClick={handleClick} disabled={disable} variant="outline-danger">
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
        </div>
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
            <Card.Text>education:</Card.Text>
            {expFields["education"].map((e, i) => <Card.Text key={i}>{`${e.title}: ${e.value}`}</Card.Text>)}
            <Card.Text>work:</Card.Text>    
            {expFields["work"].map((e, i) => <Card.Text key={i}>{`${e.title}: ${e.value}`}</Card.Text>)}
        </>
        )
    }

    return (
        <Card
            bg="white"
            text="black"
            style={{ width: "18rem" }}
            className="mb-2"
        >
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>full name: {user.fullname}</Card.Text>
                <Card.Text>email: {user.email}</Card.Text>
                <Card.Text>birthday: {`${user.birthday.day}/${user.birthday.month}/${user.birthday.year}`}</Card.Text>
                <Card.Text>interests:</Card.Text>
                <Card.Text>
                    {user.interests.map((elem, i) => (
                        <Button
                            key={i}
                            variant="outline-danger"
                        >
                            {elem}
                        </Button>
                    ))}
                </Card.Text>
                {displayExpFields()}
            </Card.Body>
        </Card>
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
                <h1>View {User.username}</h1>
                <UserCard user={User} />
                { authorized && (
                <>
                    <EditSection username={props.match.params.username} />
                    <DeleteSection
                        username={User.username}
                    />
                </>
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
