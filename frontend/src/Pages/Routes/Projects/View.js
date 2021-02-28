import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import QAForm from "../../../Components/QAForm";

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
                            {Workers.map((e) => e.username).join(", ")}
                        </Card.Text>
                        <Card.Text>tags:</Card.Text>
                        <Card.Text>
                            {Project.tags.map((elem, i) => (
                                <Button key={i} variant="outline-danger">
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

const ViewOneAnswer = (props) => {
    if (props.idx === -1) {
        return <></>;
    }
    const handleClose = () => props.close();
    console.log(props);
    const { user = {}, answers = {} } = props.answers[props.idx];

    const response = Object.keys(answers).map((key) => {
        return (
            <div>
                {key + ": " + answers[key]}
                <br />
            </div>
        );
    });

    return (
        <>
            <Modal show={props.on} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.fullname + "'s Answer"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{response}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const ViewAnswerSection = (props) => {
    const [answers, setAnswers] = useState([]);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [idx, setIdx] = useState(-1);
    // rendered component

    const viewtable = (
        <>
            <Table>
                <thead>
                    <tr>
                        <th> # </th>
                        <th> fullname </th>
                        <th> view answer </th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((elem, idx) => {
                        return (
                            <>
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{elem.user.fullname}</td>
                                    <td>
                                        <Button onClick={() => setModal(idx)}>
                                            show
                                        </Button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );

    useEffect(() => {
        axios
            .get(`/app/projects/answer/${props.id}`)
            .then((raw) => raw.data)
            .then((responses) => setAnswers(responses));
    }, [props.id, show]);

    const handleClick = () => setShow(!show);

    const handleClose = () => setShowModal(false);

    const setModal = (idx) => {
        setIdx(idx);

        setShowModal(true);
    };

    return (
        <>
            <Button variant="primary" onClick={handleClick}>
                Show answers
            </Button>
            <ViewOneAnswer
                idx={idx}
                answers={answers}
                on={showModal}
                close={handleClose}
            />
            {show && <>{viewtable}</>}
        </>
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
        <div>
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
        </div>
    );
};

const View = (props) => {
    const [Project, setProject] = useState(null);
    const [loaded, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [answer, setAnswer] = useState({});

    useEffect(() => {
        const handleError = (err) => {
            // 401, 403s are expected
            if (err.response) {
                if (err.response.status === 403) return;
                else if (err.response.status === 500)
                    return setError("internal server error");
                else setError(err.response.data);
            } else {
                setError("an unknown error occured");
            }
            setAuthorized(false);
            console.error("oh no", err);
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

    const handleAnswer = (value) => {
        setAnswer(value);
    };

    const handleSubmitAnswer = () => {
        axios
            .post(
                `/app/projects/${props.match.params.user}/${props.match.params.project}/answer`,
                answer
            )
            .then((res) => res.data);
    };

    const haveQuestion = () => {
        console.log(Project);
        return Project.questions.length > 0;
    };

    const renderComponents = () => {
        const ViewProject = () => {
            return (
                <>
                    <Link to="/projects">Back</Link>
                    <h1>{Project.name}</h1>
                    <ProjectView project={Project} />
                    <QAForm
                        type="view"
                        questions={Project.questions}
                        onChange={handleAnswer}
                    />
                    {haveQuestion() ? (
                        <>
                            <Button onClick={handleSubmitAnswer}>
                                Submit answer
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                    {authorized && (
                        <>
                            <EditSection id={Project._id} />
                            <DeleteSection
                                id={Project._id}
                                confirmationText={Project.name}
                            />
                            {haveQuestion() ? (
                                <>
                                    <ViewAnswerSection id={Project._id} />
                                </>
                            ) : (
                                <></>
                            )}
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
