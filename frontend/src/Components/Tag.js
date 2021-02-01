import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

/* ==============================================================
    <Tag onChange={} name=String label=String />
    name: general grouping
    label: individual label

    onChange(name, label, clicked) {
        
    }
=================================================================== */

const Tag = (props) => {
    const [clicked, setClick] = useState(false);

    const handleClick = (e) => {
        setClick(!clicked);
    }
    
    useEffect(() => {
        const tagChange = props.onChange;
        tagChange(props.name, props.label, clicked);
    }, [clicked, props.name, props.label, props.onChange]);

    return (
        <Button className="m-1"
            variant={(!clicked) ? "outline-danger" : "danger"}
            onClick={handleClick}
        >
            {props.label}
        </Button>
    );
}

export default Tag;