import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './Home';
import Create from './Create';
import Edit from './Edit';
import View from './View';

const Projects = () => {
    return (
      <Switch>
        <Route exact path="/projects" component={Index} />
        <Route path="/projects/create" component={Create} />
        <Route path="/projects/edit/:id" component={Edit} />
        <Route path="/projects/:user/:project" component={View} />
      </Switch>
    )
}

export default Projects;