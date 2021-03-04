import React from 'react';
import { Switch, Route } from 'react-router-dom';
const Home = React.lazy(() => import('./Routes/Home/Index'));
const About = React.lazy(() => import('./Routes/About/Index'));
const Me = React.lazy(() => import('./Routes/Users/Me'));
const Projects = React.lazy(() => import('./Routes/Projects/Index'));
const Match = React.lazy(() => import('./Routes/Match/Index'));
const Users = React.lazy(() => import('./Routes/Users/Index'));
const Login = React.lazy(() => import('./Routes/Login'));
const Logout = React.lazy(() => import('./Routes/Logout'));
const Register = React.lazy(() => import('./Routes/Register'));

const Routing = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
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

export default Routing;