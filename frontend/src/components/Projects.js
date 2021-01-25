import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectHome from './projects/ProjectHome'
import Create from './projects/Create'
import View from './projects/View'

const Projects = () => {
    return (
        <Switch>
          <Route path="/projects" exact component={ ProjectHome } />
          <Route path="/projects/create" exact component={ Create } />
          <Route path="/projects/view/:id" component={ View } />
          <Route path="/projects/view" exact component={ View } />
        </Switch>
    )
}

export default Projects;