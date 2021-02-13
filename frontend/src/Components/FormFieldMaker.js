// google forms-esque component
import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { FaWindowClose } from "react-icons/fa";

/* ==============================================================
    <FormFieldMaker name=String onChange={} type=input[, select] options=[options] [defaultValue=Array]

    defaultValue = [{title: String, value: String}, ...]
    onChange(name, fields) {
        this.setState({ experiences: { ...this.state.experiences, [type]: fields } });
        
        fields = {
            title: String,
            value: String
        }
    }
=================================================================== */

const InputField = (props) => {
    return (
        <Form.Control
            required
            as="input"
            value={props.value}
            onChange={props.onChange}
            placeholder="Field"
        >
        </Form.Control>
    );
}

const SelectField = (props) => {
    return (
        <>
            <Form.Control
                as="select"
                onChange={props.onChange}
            >
                {props.options}
            </Form.Control>
        </>
    );
}

class InputGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uID: this.props.uID,
            title: this.props.title,
            value: this.props.value
        }

        this.titleChange = this.titleChange.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.sendDelete = this.sendDelete.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    titleChange(e) {
        this.setState({ title: e.target.value }, () => {
            this.props.handleFieldChange(this.state);
        });
    }

    valueChange(e) {
        this.setState({ value: e.target.value }, () => {
            this.props.handleFieldChange(this.state);
        });
    }

    sendDelete(e) {
        e.preventDefault();
        this.props.handleDelete(this.state);
    }

    onKeyDown(e) {
        if (e.keyCode === 9) this.props.addField(); // Tab
    }

    componentDidMount() {
        this.expField.focus();
        this.expField.addEventListener('keydown', this.onKeyDown, false);
    }

    componentWillUnmount() {
        this.expField.removeEventListener('keydown', this.onKeyDown, false);
    }
    
    render() {
        let options;
        if (this.props.type === 'select') {
            options = this.props.options.map((option, i) => <option key={i}>{option}</option>);
        }

        return (
            <Form.Row>
                <Col sm={5}>
                    <Form.Group>
                    { (this.props.type === 'select')
                        ? <SelectField onChange={this.titleChange} options={options} />
                        : <InputField value={this.state.title} onChange={this.titleChange} />
                    }
                    </Form.Group>
                </Col>
                <Col sm={5}>
                    <Form.Group>
                        <Form.Control
                            required
                            ref={elem => this.expField = elem}
                            as="input"
                            value={this.state.value}
                            onChange={this.valueChange}
                            placeholder="Field"
                        />
                    </Form.Group>
                </Col>
                <Col sm={2}>
                    <Button variant="danger" onClick={this.sendDelete}>
                        <FaWindowClose size={16} />
                    </Button>
                </Col>
            </Form.Row>
        );
    }
}
