import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavigationLists as NavList } from "../Services/NavigationLists";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Login = () => {
    return (
        <Nav.Link as={Link} to="/login">
            <Button variant="outline-light" type="submit">
                Login
            </Button>
        </Nav.Link>
    )
}

const Logout = () => {
    return (
        <Nav.Link as={Link} to="/logout">
            <Button variant="outline-light" type="submit">
                Logout
            </Button>
        </Nav.Link>
    )
}

const SignUp = () => {
    return (
        <Nav.Link as={Link} to="/signup">
            <Button variant="outline-light" type="submit">
                Sign up
            </Button>
        </Nav.Link>
    );
}

const NavElement = (props) => {
    let icon = (props.elem.icon) ? props.elem.icon : '';

    return (
        <Nav.Link as={Link} to={props.elem.url} >
            <li className="nav-list">
                <span className="nav-icon">{icon}</span>
                <span className="nav-text">{"   " + props.elem.name}</span>
            </li>
        </Nav.Link>
    );
};

const SideBar = (props) => {
    return (
        <>
            <Nav id="sidebar" className={props.show ? "" : "minimized"}>
                <ul id="nav-container">
                    {NavList.map((elem, i) => {
                        return (<NavElement key={i} elem={elem} />);
                    })}
                </ul>
            </Nav>
        </>
    );
};

const LoggedIn = (props) => {
    const AuthButton = () => {
        if (props.isLoggedIn) return <Logout />;
        else if (!props.isLoggedIn) return (
            <>
                <Login />
                <SignUp />
            </>
        )
        else return (<span></span>);
    }

    return (
        <>{ AuthButton() }</>
    )
}

const NavigationBar = (props) => {
    const handleClick = () => {
        props.onToggle();
    };

    return (
        <Navbar bg="darkbrown" className="d-flex justify-content-between" variant="dark" fixed="top">
            <Container>
                <Nav>
                    <Nav.Item>
                        <div onClick={handleClick} id="hamburger">
                            {props.show ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
                        </div>
                    </Nav.Item>
                </Nav>
                <Navbar.Brand as={Link} to="/" id="nav-name">Matchy</Navbar.Brand>
                <Nav>
                    <LoggedIn isLoggedIn={props.isLoggedIn} />
                </Nav>
            </Container>
  		</Navbar>
    );
}

export { SideBar, NavigationBar };