import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProjectCard = (props) => {
    const Project = props.project;
    const Owner = Project.owner;
    const Workers = Project.workers;

    const renderCard = () => {
        if (Project && Owner && Workers) {
            return (
                <Card
                    bg="white"
                    text="black"
                    style={{ width: '18rem' }}
                    className="mb-2"
                    >
                    <Card.Body>
                        <Card.Title>{Project.name}</Card.Title>
                        <Card.Text>by {Owner.username}</Card.Text>
                        <Card.Text>{Project.description}</Card.Text>
                        <Card.Text>employees: { Workers.map((e) => e.username).join(', ') }</Card.Text>
                        <Card.Text>tags:</Card.Text>
                        <Card.Text>
                        {Project.tags.map((elem, i) => (
                            <Button
                                key={i}
                                variant="outline-danger"
                            >
                                {elem}
                            </Button>
                        ))}
                        </Card.Text>
                        <Link to={`/projects/${Project._id}`}>
                            <Button variant="outline-info" type="submit">
                                View
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            )
        }
        else {
            return (<span>can't display the project</span>)
        }
    }

    return (
        <>
        { renderCard() }
        </>
    )
}

export default ProjectCard;