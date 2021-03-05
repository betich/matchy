import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <Link to="/login">
            <Button variant="outline-danger" className="button-group" type="submit">
                Login
            </Button>
        </Link>
    )
}

const SignUp = () => {
    return (
        <Link to="/signup">
            <Button variant="outline-danger" className="button-group" type="submit">
                Sign up
            </Button>
        </Link>
    );
}

const Home = (props) => {
    const renderComponents = () => {
        if (props.isLoggedIn && props.User) {
            return (
            <>
                <h1 id="welcome">
                    Welcome, { props.User.username }
                </h1>
                <hr />
                <Link to="/match">
                    <Button variant="info" className="button-group" type="submit">
                        Match
                    </Button>
                </Link>
                <Link to="/projects/create">
                    <Button variant="outline-info" className="button-group" type="submit">
                        Create a new project
                    </Button>
                </Link>
            </>
            );
        } else if (!props.isLoggedIn) {
            return (
            <>
                <h1 id="welcome">
                    Welcome, please sign in
                </h1>
                <Login />
                <SignUp />
            </>
            );
        } else {
            return (
            <>
                <h1 id="welcome">
                    Welcome.
                </h1>
            </>
            );
        }
    }

    return (
        <>{ renderComponents() }</>
    )
}

export default Home;