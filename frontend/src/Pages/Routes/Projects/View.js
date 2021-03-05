import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ViewAnswerSection from "../../../Components/ViewAnswers";

const ProjectView = (props) => {
    const Project = props.project;
    const Owner = Project.owner;
    const Workers = Project.workers;

    const renderCard = () => {
        if (Project && Owner && Workers) {
            return (
                <Card
                    bg="white"
                    text="black"
                    style={{ width: "18rem" }}
                    className="mb-2"
                >
                    <Card.Body>
                        <Card.Title>{Project.name}</Card.Title>
                        <Card.Text>by {Owner.username}</Card.Text>
                        <Card.Text>{Project.description}</Card.Text>
                        <Card.Text>
                            employees:{" "}
                            {Workers.map((e) => <span key={e._id}><Link to={`/users/${e.username}`}>{e.username}</Link>, </span>)}
                        </Card.Text>
                        <Card.Text>tags:</Card.Text>
                        <Card.Text>
                            {Project.tags.map((elem, i) => (
                                <Button key={i} variant="outline-earthbrown">
                                    {elem}
                                </Button>
                            ))}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        } else {
            return <span>can't display the project</span>;
        }
    };

    return <>{renderCard()}</>;
};

const EditSection = (props) => {
    return (
        <Link to={`/projects/edit/${props.id}`}>
            <Button variant="outline-info">Edit</Button>
        </Link>
    );
};

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
                axios.delete(`/app/projects/${props.id}`).then((response) => {
                    if (response.status === 200) {
                        history.push("/projects");
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
        <>
            <Button
                onClick={handleClick}
                disabled={disable}
                variant="outline-danger"
            >
                Delete
            </Button>
            {show && (
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Enter project's name and hit Delete again
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            onChange={handleChange}
                            name="confirmationtext"
                        ></Form.Control>
                    </Form.Group>
                </div>
            )}
        </>
    );
};

const View = (props) => {
    const [Project, setProject] = useState(null);
    const [loaded, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const handleError = (err) => {
            // 401, 403s are expected
            if (err.response) {
                if (err.response.status === 403) return;
                else if (err.response.status === 500) {
                    return setError("Internal server error");
                }
                else setError(err.response.data);
            } else {
                setError("An unknown error occured");
            }
            setAuthorized(false);
            console.error(err);
        };

        const checkOwnership = (id) => {
            return axios
                .get(`/app/projects/checkownership/${id}`)
                .then((response) => response.data)
                .then((user) => user)
                .then(() => setAuthorized(true))
                .catch(handleError);
        };

        axios
            .get(
                `/app/projects/${props.match.params.user}/${props.match.params.project}`
            )
            .then((response) => response.data)
            .then((project) => {
                setProject(project);
                checkOwnership(project._id);
            })
            .catch(handleError)
            .finally(() => setLoad(true));
    }, [props.match.params.project, props.match.params.user]);

    const haveQuestion = () => {
        return Project.questions.length > 0;
    };

    const reRender = () => {
        setLoad(false);

        const handleError = (err) => {
            // 401, 403s are expected
            if (err.response) {
                if (err.response.status === 403) return;
                else if (err.response.status === 500)
                    return setError("Internal server error");
                else setError(err.response.data);
            } else {
                setError("An unknown error occured");
            }
            setAuthorized(false);
            console.error(err);
        };

        axios
            .get(
                `/app/projects/${props.match.params.user}/${props.match.params.project}`
            )
            .then((response) => response.data)
            .then((project) => {
                setProject(project);
            })
            .catch(handleError)
            .finally(() => setLoad(true));
    }

    const renderComponents = () => {
        const ViewProject = () => {
            return (
                <>
                    <h1>{Project.name}</h1>
                    <ProjectView project={Project} />
                    {authorized && (
                        <>
                            {haveQuestion() ? (
                                <div>
                                    <ViewAnswerSection onChange={reRender} id={Project._id} />
                                </div>
                            ) : (
                                <></>
                            )}
                            <div>
                                <EditSection id={Project._id} />
                                <DeleteSection
                                    id={Project._id}
                                    confirmationText={Project.name}
                                />
                            </div>
                        </>
                    )}
                </>
            );
        };

        if (loaded) {
            if (error) return <span>{error}</span>;
            else return <> {ViewProject()} </>;
        } else {
            return <span>loading...</span>;
        }
    };

    return <>{renderComponents()}</>;
};

export default View;
