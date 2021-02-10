import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../../Components/Loading";

const EditSection = (props) => {
    return (
        <Link to={`/users/edit/${props.id}`}>
            <Button>Edit</Button>
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
                axios.delete(`/app/users/${props.id}`).then((response) => {
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
        if (e.target.value === props.confirmationText) {
            setDisable(false);
            setConfirmed(true);
        } else {
            setDisable(true);
            setConfirmed(false);
        }
    };
    return (
        <div>
            <Button onClick={handleClick} disabled={disable}>
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

const View = (props) => {
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
            {!loaded ? (
                <Loading />
            ) : Object.keys(User).length === 0 &&
              User.constructor === Object ? (
                <span>Can't find the User lol</span>
            ) : (
                <>
                    <Link to="/users">Back</Link>
                    <Card
                        bg="white"
                        text="black"
                        style={{ width: "18rem" }}
                        className="mb-2"
                    >
                        <Card.Header>User</Card.Header>
                        <Card.Body>
                            <Card.Title>{User.username}</Card.Title>
                            <Card.Text>
                                <p>
                                    interests:{" "}
                                    {User.interests.map((elem, i) => (
                                        <Button
                                            key={i}
                                            variant="outline-danger"
                                        >
                                            {elem}
                                        </Button>
                                    ))}
                                </p>
                                <p>
                                    experiences:{" "}
                                    {JSON.stringify(User.experiences)}
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <DeleteSection
                        confirmationText={User.username}
                        id={User._id}
                    />
                    <EditSection id={props.match.params.id} />
                </>
            )}
        </>
    );
};

export default View;
