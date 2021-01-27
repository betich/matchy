import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './Projects/Index';
import Create from './Projects/Create';
import Edit from './Projects/Edit';
import View from './Projects/View';
import Delete from './Projects/Delete';

const Projects = () => {
    return (
      <Switch>
        <Route exact path="/projects" component={Index} />
        <Route path="/projects/create" component={Create} />
        <Route path="/projects/edit" component={Edit} />
        <Route path="/projects/delete" component={Delete} />
        <Route path="/projects/:id" component={View} />
      </Switch>
    )
}

export default Projects;