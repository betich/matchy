import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './Home';
import Create from './Create';
import Edit from './Edit';
import View from './View';
import Delete from './Delete';

const Users = () => {
    return (
        <Switch>
            <Route exact path="/users" component={Index} />
            <Route path="/users/create" component={Create} />
            <Route path="/users/edit" component={Edit} />
            <Route path="/users/delete" component={Delete} />
            <Route path="/users/:id" component={View} />
        </Switch>
    );
}

/*
const Users = () => {
    return (
        <Switch>
            <Route exact path="/users" component={Index} />
        </Switch>
        );
}
*/

export default Users;