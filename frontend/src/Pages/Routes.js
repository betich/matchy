import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { SideBar, NavigationBar } from '../Components/NavBar';
import isLoggedIn from '../Services/isLoggedIn';
import Flash from '../Components/Flash';
import Bus from '../Services/Bus';
import { Container } from 'react-bootstrap';
import Loading from '../Components/Loading';

const Home = React.lazy(() => import('./Routes/Home/Index'));
const About = React.lazy(() => import('./Routes/About/Index'));
const Me = React.lazy(() => import('./Routes/Users/Me'));
const Projects = React.lazy(() => import('./Routes/Projects/Index'));
const Match = React.lazy(() => import('./Routes/Match/Index'));
const Users = React.lazy(() => import('./Routes/Users/Index'));
const Login = React.lazy(() => import('./Routes/Login'));
const Logout = React.lazy(() => import('./Routes/Logout'));
const Register = React.lazy(() => import('./Routes/Register'));

window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));


const Routing = (props) => {
    const User = props.User;
    const isLoggedIn = props.isLoggedIn;

    return (
        <Switch>
            <Route path="/" exact render={(props) => (
                <Home {...props} User={User} isLoggedIn={isLoggedIn} />
            )}
            />
            <Route path="/me" component={Me} />
            <Route path="/about" exact component={About} />
            <Route path="/match" exact component={Match} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/signup" exact component={Register} />
            <Route path="/users" component={Users} />
            <Route path="/projects" component={Projects} />
            <Route path="*" component={() =><span>not found</span>} />
        </Switch>
    );
}

const Main = () => {
    const [message, setMessage] = useState(null);
	const [type, setType] = useState(null);
	const [visible, setVisibility] = useState(false);
	const [showExpand, setShow] = useState(true);
	const [userLoggedIn, setLoggedIn] = useState(false);
    const [User, setUser] = useState(null);
    const [loaded, setLoad] = useState(false);

    useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
			setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 4000);
		});
		
		const getUser = async () => {
            let [loggedIn, user] = await isLoggedIn();
            if (loggedIn) setUser(user);
            setLoggedIn(loggedIn);
            setLoad(true);
        }
        getUser();
    }, []);

    const onToggle = () => {
		setShow(!showExpand);
	}
    
    const renderComponents = () => {
		if (loaded) {
			return (
				<>
					<NavigationBar onToggle={onToggle} show={showExpand} isLoggedIn={userLoggedIn} />
					<article id="App">
						<header>
							<SideBar show={showExpand} />
						</header>
						<main id="main">
							<Container>
								{ visible &&
									<Flash
									type={type}
									message={message}
									onClose={() => setVisibility(false)}
									/>
								}
								<Routing User={User} isLoggedIn={userLoggedIn} />
							</Container>
						</main>
					</article>
				</>
			  );
		} else {
			return (<Loading />);
		}
	}

	return (<>{ renderComponents() }</>);
}

export default Main;