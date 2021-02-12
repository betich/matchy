import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

/* ==============================================================
    <Tags onChange={} group=String tags=Array [onAsDefault=Array] />
    group: general grouping
    label: individual label
    onAsDefault: array of string of tags that is clicked as initalized
    
    onChange(group, tags) {
        
    }
=================================================================== */

const Tag = (props) => {
    const [clicked, setClick] = useState(props.startState);
    const firstRender = useRef(true);

    const handleClick = (e) => {
        setClick(!clicked);
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        } else {
            const tagChange = props.onChange;
            tagChange(props.label, clicked);
        }
    }, [clicked, props.label, props.onChange]);

    return (
        <Button
            className="m-1"
            variant={!clicked ? "outline-danger" : "danger"}
            onClick={handleClick}
        >
            {props.label}
        </Button>
    );
};

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        };
        this.initialState = {};
        this.tagChange = this.tagChange.bind(this);
        this.props.tags.forEach((elem) => (this.initialState[elem] = false));
        this.props.onAsDefault?.forEach((elem) => {
            this.initialState[elem] = true;
        });
    }

    // set initial state
    componentDidMount() {
        if ( this.props.onAsDefault && this.props.onAsDefault.length > 0 )
        this.setState({ tags: this.props.onAsDefault });
    }

    tagChange(label, checked) {
        let newTags;
        const modifyTags = (tags) => {
            let idx = tags.findIndex((e) => e === label);
            return checked
                ? tags.concat(label)
                : tags.slice(0, idx).concat(tags.slice(idx + 1, tags.length));
        };
        newTags = modifyTags(this.state.tags);
        this.setState({ tags: newTags }, () => {
            this.props.onChange(this.props.group, this.state.tags);
        });
    }

    render() {
        let TagButtons = [];
        for (const key in this.initialState) {
            TagButtons.push(
                <Tag
                    onChange={this.tagChange}
                    group={this.props.group}
                    label={key}
                    key={key}
                    startState={this.initialState[key]}
                />
            );
        }
        // const TagButtons = this.props.tags.map((item, i) => {
        //     const startState = this.props.onAsDefault?.includes(item) || false;
        //     return (
        //         <Tag onChange={this.tagChange} group={this.props.group} label={item} key={i} startState={startState} />
        //     );
        // });

        return <>{TagButtons}</>;
    }
}

export default Tags;