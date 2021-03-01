import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";

const ViewOneAnswer = (props) => {
    if (props.idx === -1) {
        return <></>;
    }
    const handleClose = () => props.close();
    const { user = {}, answers = {} } = props.answers[props.idx];

    const response = Object.keys(answers).map((key, i) => {
        return (
            <div key={i}>
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

    const acceptUser = (idx) => {
        // setAnswers(response)
    }

    const rejectUser = (idx) => {

    }

    const viewtable = (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Answer</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((elem, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{elem.user.fullname}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        onClick={() => setModal(idx)}
                                    >
                                        Show
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() => acceptUser(idx)}
                                    >
                                        Accept
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => rejectUser(idx)}
                                    >
                                        Reject
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );

    return (
        <>
            <Button
                variant="info"
                onClick={handleClick}
            >
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

export default ViewAnswerSection;