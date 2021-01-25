import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const About = () => {

    return (
    <>
        <Link to="/projects/create">
            <Button variant="outline-danger" type="submit">
                Create
            </Button>
        </Link>
        <Link to="/projects/view">
            <Button variant="outline-danger" type="submit">
                View
            </Button>
        </Link>
        <Link to="/projects/edit">
            <Button variant="outline-danger" type="submit" disabled>
                Edit
            </Button>
        </Link>
        <Link to="/projects/delete">
            <Button variant="outline-danger" type="submit" disabled>
                Delete
            </Button>
        </Link>
    </>
    );
  }

  export default About;