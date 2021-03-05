import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewProject = (props) => {
    const Project = props.project;
    const Owner = Project.owner;
    const Workers = Project.workers;

    return (
        <>
            <div className="info">
                <h1>{Project.name}</h1>
                <h6>by {Owner.username}</h6>
                <hr />
                <p>{Project.description}</p>
                <p>
                    Employees: {Workers.map((e) => <span key={e._id}><Link to={`/users/${e.username}`}>{e.username}</Link>, </span>)}
                </p>
                <p>Projects: </p>
                <div>
                {Project.tags.map((elem, i) => (
                    <Button key={i} className="button-group" variant="outline-earthbrown">
                        {elem}
                    </Button>
                ))}
                </div>
            </div>
        </>
    )
}

export default ViewProject;