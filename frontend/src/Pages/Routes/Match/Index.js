import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './Home';

const Projects = () => {
    return (
      <Switch>
        <Route exact path="/match" component={Index} />
      </Switch>
    )
}

export default Projects;