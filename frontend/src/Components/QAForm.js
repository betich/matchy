import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import validate from "../Services/Validate";
import Error from './Error';

/* ==============================================================
    <Error errors=Object />
    Displays errors
    
    <QAForm type=type onChange=function questions={[{value: String, type: type}, ...]} />
    
=================================================================== */

const ViewOneForm = (props) => {
    const handleChange = (e) => {
        props.onChange(props.question.value, e.target.value);
    }

    return <>
        <Form.Group>
            <Form.Label>{props.question.value}</Form.Label>
            <Form.Control onChange={handleChange} />
        </Form.Group>
    </>
    
}

const CreateOneForm = (props) => {
    const [Question, setQuestion] = useState(props.value);
    const update = props.onChange;

    const handleChange = (e) => {
        const newQuestion = { ...Question, value: e.target.value };
        setQuestion(newQuestion);
        update(newQuestion)
    };

    const handleDelete = () => {
        const newQuestion = { ...Question, deleting: true };
        setQuestion(newQuestion);
        update(newQuestion)
    };

    return (
        <>
            <Form.Control
                placeholder="Question"
                onChange={handleChange}
                value={props.value.value}
            ></Form.Control>
            <Form.Control placeholder="Answer" disabled></Form.Control>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </>
    );
};

const FillQA = (props) => {
    const emptyAnswers = props.project.questions.reduce((map, obj) => {
        map[obj.value] = "";
        return map;
    }, {});

    const [answers, setAnswers] = useState(emptyAnswers);
    const [errors, setError] = useState({});

    const Project = props.project;
    const Questions = Project.questions;
    
    const handleChange = (key, value) => {
        const newAnswers =  { ...answers, [ key ]: value};
        setAnswers(newAnswers);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { cucumber: Object.values((answers)) };
        const { valid, invalidData } = validate(data);

        if (valid) {
            const options = {
                headers: { "Content-Type": "application/json" },
            };
            
            axios
                .post(
                    `/app/projects/answer/${Project._id}`,
                    answers,
                    options
                )
                .then((res) => res.data)
                .catch((err) => {
                    switch (err.response.status) {
                        case 409:
                            setError({ errors: {project: ['duplicate project']}});
                            break;
                        default:
                            console.error(err);
                    }
                })
                .finally(() => {
                    if (props.onSubmit) props.onSubmit();
                });
        } else {
            setError(invalidData);
        }
    };

    return <>
        <Form>
            {Questions.map((elem, idx) => {
                return <ViewOneForm
                    key={idx}
                    question={elem}
                    onChange={handleChange}
                />
            })}
            <Error errors={errors} />
            <Button
                onClick={handleSubmit}
                variant="info"
            >
                Submit answer
            </Button>
        </Form>
    </>;
};

const CreateQA = (props) => {
    const [QuestionList, setQuestionList] = useState([]);

    const handleChange = (idx, value) => {
        var current = QuestionList;
        current[idx] = value;
        current = current.filter(
            (e) => !("deleting" in e) || e.deleting === false
        );
        setQuestionList(current);
    };

    const createForm = () => {
        setQuestionList([...QuestionList, { value: "" }]);
    };

    useEffect(() => {
        const FormChange = props.onChange;
        FormChange(QuestionList);
    }, [QuestionList, props.onChange]);

    const Questions = QuestionList.map((elem, idx) => {
        return (
            <CreateOneForm
                key={idx}
                value={elem}
                onChange={(value) => handleChange(idx, value)}
            />
    )});

    return (
        <>
            <Button onClick={createForm} variant="outline-info">Create</Button>
            {Questions}
        </>
    );
};

export { FillQA, CreateQA };
