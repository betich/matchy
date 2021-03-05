import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <Link to="/login">
            <Button variant="outline-danger" type="submit">
                Login
            </Button>
        </Link>
    )
}

const SignUp = () => {
    return (
        <Link to="/signup">
            <Button variant="outline-danger" type="submit">
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
                <h1>
                    Welcome, { props.User.username }
                </h1>
            </>
            );
        } else if (!props.isLoggedIn) {
            return (
            <>
                <h1>
                    Welcome, please sign in
                </h1>
                <Login />
                <SignUp />
            </>
            );
        } else {
            return (
            <>
                <h1>
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