import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Switch , Route, BrowserRouter as Router } from 'react-router-dom';
const NavigationBar = React.lazy(() => import('./Components/Partials/NavigationBar'));
const Home = React.lazy(() => import('./Components/Routes/Home'));
const About = React.lazy(() => import('./Components/Routes/About'));
const Projects = React.lazy(() => import('./Components/Routes/Projects'));
const Matching = React.lazy(() => import('./Components/Routes/Matching'));
const Users = React.lazy(() => import('./Components/Routes/Users'));

function App() {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Router>
      <div className="App">
        <header className="App-header">
          <NavigationBar />
        </header>
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/match" exact component={Matching} />
            <Route path="/users" component={Users} />
            <Route path="/projects" component={Projects} />
          </Switch>
        </Container>
      </div>
      </Router>
    </React.Suspense>
  );
}

export default App;