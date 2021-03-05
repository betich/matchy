import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

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

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
            type: null,
            visible: false,
            showExpand: true,
            isLoggedIn: false,
            User: null,
            loaded: false
        }

        this.requestUser = this.requestUser.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    requestUser() {
        const getUser = async () => {
            let [loggedIn, user] = await isLoggedIn();
            if (loggedIn) this.setState({ User: user });
            this.setState({ isLoggedIn: loggedIn, loaded: true });
        }

        getUser();
    }

    onToggle() {
		this.setState({ showExpand: !this.state.showExpand });
	}

    componentDidMount() {
        Bus.addListener('flash', ({message, type}) => {
            this.setState({
                visible: true,
                message: message,
                type: type
            }, () => {
                setTimeout(() => {
                    this.setState({
                        visible: false
                    })
                }, 4000);
            })
		});

        this.requestUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.requestUser();
        }
    }

    render() {
        const renderComponents = () => {
            if (this.state.loaded) {
                return (
                    <>
                        <NavigationBar onToggle={this.onToggle} show={this.state.showExpand} isLoggedIn={this.state.isLoggedIn} />
                        <article id="App">
                            <header>
                                <SideBar show={this.state.showExpand} />
                            </header>
                            <main id="main">
                                <Container>
                                    { this.state.visible &&
                                        <Flash
                                        type={this.state.type}
                                        message={this.state.message}
                                        onClose={() => this.setState({ visible: false })}
                                        />
                                    }
                                    <Routing User={this.state.User} isLoggedIn={this.state.isLoggedIn} />
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
}

export default withRouter(props => <Page {...props}/>);