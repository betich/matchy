import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

/* ==============================================================
    <Tags onChange={} group=String tags=Array />
    group: general grouping
    label: individual label

    onChange(group, tags) {
        
    }
=================================================================== */

const Tag = (props) => {
    const [clicked, setClick] = useState(false);

    const handleClick = (e) => {
        setClick(!clicked);
    }
    
    useEffect(() => {
        const tagChange = props.onChange;
        tagChange(props.label, clicked);
    }, [clicked, props.label, props.onChange]);

    return (
        <Button className="m-1"
            variant={(!clicked) ? "outline-danger" : "danger"}
            onClick={handleClick}
        >
            {props.label}
        </Button>
    );
}

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }

        this.tagChange = this.tagChange.bind(this);
    }

    tagChange(label, checked) {
        let newTags;
        const modifyTags = (tags) => {
            let idx = tags.findIndex((e) => e === label);
            return checked ?
                tags.concat(label) : tags.slice(0, idx).concat(tags.slice(idx+1, tags.length));
        };
        
        newTags =  modifyTags(this.state.tags);
        this.setState({ tags: newTags }, () => {
            this.props.onChange(this.props.group, this.state.tags);        })
    }

    render() {
        const TagButtons = this.props.tags.map((item, i) => {
            return (
                <Tag onChange={this.tagChange} group={this.props.group} label={item} key={i} />
            );
        });

        return (
            <>{TagButtons}</>
        );
    }
}

export default Tags;