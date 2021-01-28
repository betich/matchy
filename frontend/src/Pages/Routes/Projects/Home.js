import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
    <>
        <h1>Projects</h1>
        <Link to="/projects/create">
            <Button variant="outline-danger" type="submit">
                Create
            </Button>
        </Link>
        <Link to="/projects/123">
            <Button variant="outline-danger" type="submit">
                View
            </Button>
        </Link>
        <Link to="/projects/edit">
            <Button variant="outline-danger" type="submit">
                Edit
            </Button>
        </Link>
        <Link to="/projects/delete">
            <Button variant="outline-danger" type="submit">
                Delete
            </Button>
        </Link>
    </>
    );
}

export default Index;