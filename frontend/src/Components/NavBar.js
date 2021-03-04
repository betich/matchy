import { Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
	return (
		<Navbar bg="light" variant="light">
			<Container>
			<Navbar.Brand href="/">Planty</Navbar.Brand>
			<Nav className="mx-auto">
				<Nav.Link as={Link} to="/" className="mx-1">Home</Nav.Link>
				<Nav.Link as={Link} to="/match"className="mx-1">Match</Nav.Link>
				<Nav.Link as={Link} to="/projects" className="mx-1">Projects</Nav.Link>
				<Nav.Link as={Link} to="/me" className="mx-1">Me</Nav.Link>
				<Nav.Link as={Link} to="/about" className="mx-1">About</Nav.Link>
			</Nav>
		  </Container>
		</Navbar>
	)
}

export default NavigationBar;