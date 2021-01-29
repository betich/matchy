import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Tag = (props) => {
    const [clicked, setClick] = useState(false);

    const handleClick = (e) => {
        setClick(!clicked);
    }
    
    useEffect(() => {
        const tagChange = props.change;
        tagChange(props.type, props.name, clicked);
    }, [clicked, props.name, props.type, props.change]);

    return (
        <Button className="m-1"
            variant={(!clicked) ? "outline-danger" : "danger"}
            onClick={handleClick}
            value={props.name}
            name={props.type}
        >
            {props.name}
        </Button>
    );
}

export default Tag;