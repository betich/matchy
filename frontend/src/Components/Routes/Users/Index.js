import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Index = () => {
    return (
    <>
        <h1>Users</h1>
        <Link to="/users/create">
            <Button variant="outline-danger" type="submit">
                Create
            </Button>
        </Link>
        <Link to="/users/123">
            <Button variant="outline-danger" type="submit">
                View
            </Button>
        </Link>
        <Link to="/users/edit">
            <Button variant="outline-danger" type="submit">
                Edit
            </Button>
        </Link>
        <Link to="/users/delete">
            <Button variant="outline-danger" type="submit">
                Delete
            </Button>
        </Link>
    </>
    );
}

export default Index;