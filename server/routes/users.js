const express = require('express');
const router = express.Router();
const User = require('../models/users');

router
.get('/:id', (req, res) => {
    User.findById(req.params.id)/*.populate(project)*/.exec((err, foundUser) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else if (!foundUser) {
            res.send('unable to find a user with that id');
        } else {
            res.json({user: foundUser});
        }
    });
})

.post('/', (req, res) => {
    let body = req.body;
    let newUser = {};
    newUser.username = body.username;
    newUser.name = { first: body.firstname, last: body.lastname};
    newUser.birthday = { day: body.bDay, month: body.bMonth, year: body.bYear};
    body.experiences.forEach((exp) => newUser.experiences.push(exp));
    body.interests.forEach((e) => newUser.push(e));
    newUser.login.email = { login: body.email, password: body.pasword }

    User.create(newUser, (err, User) => {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            console.info(`${User.name} has been created`);
            res.send('success');
        }
    });
})

module.exports = router;