import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
/* ==============================================================
    <Error errors=Object />
    Displays errors
    
=================================================================== */

const CreateOneForm = (props) => {
    const [Question, setQuestion] = useState(props.value);

    const handleChange = (e) => {
        setQuestion({...Question,value: e.target.value});
    };

    const handleDelete = () => {
        setQuestion({...Question, deleting: true});
    }

    useEffect(() => {
        const update = props.onChange;
        update(Question);
    }, [Question, props.id])

    return (
        <>
            <Form.Control
                placeholder="Question"
                onChange={handleChange}
                value={props.value.value}
            ></Form.Control>
            <Form.Control placeholder="Answer" disabled></Form.Control>
            <Button onClick={handleDelete}>{'Delete: ' + props.kk}</Button>
        </>
    );
};

const CreateQA = (props) => {
    const [QuestionList, setQuestionList] = useState([]);

    const handleChange = (idx, value) => {
        var current = QuestionList;
        current[idx] = value;
        current = current.filter(e => !('deleting' in e) || e.deleting === false);
        setQuestionList(current);
    }

    const createForm = () => {
        setQuestionList([...QuestionList, {value: ''}]);
    }

    useEffect(() => {
        const FormChange = props.onChange;
        FormChange(QuestionList);
    }, [QuestionList, props.onChange])

    return (
        <>
            <Button onClick={createForm}>
                Create
            </Button>
            {QuestionList.map((elem, idx) => {
                return <CreateOneForm kk={idx} key={idx} value={elem} onChange={(value) => handleChange(idx,value)} ></CreateOneForm>;
            })}
        </>
    );
};

const QAForm = (props) => {
    const createForm = (type) => {
        switch (type) {
            case "create":
                return <CreateQA onChange={props.onChange} />;
            default:
                console.error("type doesn't exist");
        }
    };

    return <>{createForm(props.type)}</>;
};

export default QAForm;
