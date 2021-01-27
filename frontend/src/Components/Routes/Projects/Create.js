import axios from 'axios';
import React from 'react';
import { Form, Button } from 'react-bootstrap';

const TagLists = ['Foodtech','Proptech','Fashion','Edtech','Healthtech','Beautytech','Insurtech','Logistic','Cleantech','Traveltech'];

class Tag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({toggle: !this.state.toggle}, () => {
            this.props.change(this.props.name, this.state.toggle);
        });
    }

    render() {
        return (
            <Button className="m-1"
                variant={(!this.state.toggle) ? "outline-danger" : "danger"}
                onClick={this.handleClick}
                id={this.props.name}
            >
                {this.props.name}
            </Button>
        );
    }
}

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name: '',
            description: '',
            tags: []
        }
    }

    tagChange(tag, checked) {
        // do something
        let tags = this.state.tags;
        let idx = tags.findIndex((e) => e === tag);
        let newTags = checked ?
            tags.concat(tag) : tags.slice(0, idx).concat(tags.slice(idx+1, tags.length));
        this.setState({ tags: newTags });
        console.log(newTags);
    }

    async handleSubmit(e) {
        e.preventDefault();
        let obj = {
            Name: this.state.name,
            Description: this.state.description,
            Tags: this.state.tags
        }

        try {
            const response = await axios.post('/projects/new', {
                'Content-Type': 'application/json',
                body: obj
            })
            console.log(response);
            if (response.status === 200) {
                this.props.history.push(`/projects/view/${response.data.id}`);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    handleChange(e) {
        switch (e.target.id) {
            case 'formProjectName':
                this.setState({name: e.target.value});
                break;
            case 'formProjectDescription':
                this.setState({description: e.target.value});
                break;
            default:
                console.log("unknown input");
        }
    }

    render() {
        const TagButtons = TagLists.map((item, i) => {
            return (
                <Tag change={this.tagChange} name={item} key={i} />
            )
        });

        return (
            <>
                <h1>Create Form</h1>
                <Form noValidate onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formProjectName">
                        <Form.Label>Project name</Form.Label>
                        <Form.Control onChange={this.handleChange} required type="ProjectName" placeholder="Example project" />
                    </Form.Group>

                    <Form.Group controlId="formProjectDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleChange} type="ProjectDescription" placeholder="Description" />
                    </Form.Group>
                        
                    <Form.Group className="mb-3" controlId="formTags">
                        <Form.Label>Tags:</Form.Label>
                            {TagButtons}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </>
        );
    }
}

export default Create;