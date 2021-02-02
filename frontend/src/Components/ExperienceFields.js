import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { FaWindowClose } from "react-icons/fa";


/* ==============================================================
    <ExperienceGroup onChange={} type=input[, select] options=[options] />

    onChange(fields) {
        fields = {
            title: String,
            value: String
        }
    }
=================================================================== */

const ExperienceInput = (props) => {
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

const ExperienceSelect = (props) => {
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

class ExperienceField extends React.Component {
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
                <Col>
                    <Form.Group>
                    { (this.props.type === 'select')
                        ? <ExperienceSelect onChange={this.titleChange} options={options} />
                        : <ExperienceInput value={this.state.title} onChange={this.titleChange} />
                    }
                    </Form.Group>
                </Col>
                <Col>
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
                <Col>
                    <Button variant="danger" onClick={this.sendDelete}>
                        <FaWindowClose size={16} />
                    </Button>
                </Col>
            </Form.Row>
        );
    }
}

class ExperienceGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
                { title: 'Planty', value: '', uID: 1 }
            ],
            IDCount: 1
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleAdd(e) {
        let newUID = this.state.IDCount + 1;
        let newFields = [...this.state.fields].concat({title: 'Planty', value: '', uID: newUID});
        
        this.setState({ fields: newFields, IDCount: newUID }, () => {
            this.props.onChange(this.props.name, this.state.fields);
        });
    }
    
    handleDelete(field) {
        let newFields = [...this.state.fields];
        for (let i = 0; i < newFields.length; i++) {
            if (field["uID"] === this.state.fields[i]["uID"]) {
                newFields = newFields.slice(0, i).concat(newFields.slice(i+1, newFields.length));
            }
        }

        this.setState({ fields: newFields }, () => {
            this.props.onChange(this.props.name, this.state.fields);
        });
    }

    handleFieldChange(field) {
        let newFields = [...this.state.fields];
        
        for (let i in newFields) {
            if (field["uID"] === this.state.fields[i]["uID"]) {
                newFields[i] = field;
            }
        }

        this.setState({ fields: newFields }, () => {
            this.props.onChange(this.props.name, this.state.fields);
        });
    }
    
    render() {
        let fieldElems = this.state.fields.map((field) => {
            return <ExperienceField
                key={field.uID}
                uID={field.uID}
                title={field.title}
                value={field.value}
                handleFieldChange={this.handleFieldChange}    
                handleDelete={this.handleDelete}
                options={this.props.options}
                type={this.props.type}
                addField={this.handleAdd}
            />;
        });
        return (
            <>
                <Button variant="danger" onClick={this.handleAdd}>Add</Button>
                {fieldElems}
            </>
        );
    }
}

export default ExperienceGroup;