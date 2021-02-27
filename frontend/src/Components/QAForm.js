import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

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
            <Button onClick={handleDelete}>Delete</Button>
        </>
    );
};

const ViewForm = (props) => {
    const [answers, setAnswers] = useState({});
    
    const handleChange = (key, value) => {
        const newAnswers =  { ...answers, [ key ]: value};
        setAnswers(newAnswers);
        props.onChange(newAnswers);
    }

    return <>
        <Form>
            {props.questions.map((elem,idx) => {
                return <ViewOneForm question={elem} key={idx} onChange={handleChange} />
            })}
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

    const k = QuestionList.map((elem, idx) => {
            return (
                <CreateOneForm
                    kk={idx}
                    key={idx}
                    value={elem}
                    onChange={(value) => handleChange(idx, value)}
                ></CreateOneForm>
    )});

    return (
        <>
            <Button onClick={createForm}>Create</Button>
            {k}
        </>
    );
};

const QAForm = (props) => {
    const createForm = (type) => {
        switch (type) {
            case "create":
                return <CreateQA onChange={props.onChange} />;
            case "view":
                return (
                    <ViewForm
                        onChange={props.onChange}
                        questions={props.questions}
                    />
                );
            default:
                console.error("type doesn't exist");
        }
    };

    return <>{createForm(props.type)}</>;
};

export default QAForm;