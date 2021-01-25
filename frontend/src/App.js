import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import About from './Components/About';
import Project from './Components/Projects';
import Matching from './Components/Matching';


import { Switch , Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavigationBar />
        </header>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/about" exact component={ About } />
          <Route path="/matching" exact component={ Matching } />
          <Route path="/projects" component = { Project } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;