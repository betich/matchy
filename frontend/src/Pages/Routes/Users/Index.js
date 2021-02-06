import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './Home';
import Create from './Create';
import Edit from './Edit';
import View from './View';

const Users = () => {
    return (
        <Switch>
            <Route exact path="/users" component={Index} />
            <Route path="/users/create" component={Create} />
            <Route path="/users/edit" component={Edit} />
            <Route path="/users/:id" component={View} />
        </Switch>
    );
}

export default Users;