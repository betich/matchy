import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './Home';
import Edit from './Edit';
import View from './View';

const Users = () => {
    return (
        <Switch>
            <Route exact path="/users" component={Index} />
<<<<<<< HEAD
            <Route path="/users/edit" component={Edit} />
            <Route path="/users/delete" component={Delete} />
=======
            <Route path="/users/create" component={Create} />
            <Route path="/users/edit/:id" component={Edit} />
>>>>>>> 15266119aeb8c51dbb80edfbfbd9ae5240984745
            <Route path="/users/:id" component={View} />
        </Switch>
    );
}

export default Users;