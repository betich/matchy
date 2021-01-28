const express = require('express');
const router = express.Router();
const User = require('../models/users');

router
.get('/', (req, res) => {
    try {
        User.find({}).populate("projects").populate("archive").exec((err, foundUsers) => {
            if (err) {
                console.error(err);
                res.status(404);
                res.send(err);
            } else if (!foundUsers) {
                res.status(404);
                res.send('unable to find users');
            } else {
                res.status(200);
                res.json(foundUsers);
            }
        });
    } catch (err) {
        res.status(404);
        res.send(err);
    }
})

.get('/:id', (req, res) => {
    try {
        User.findById(req.params.id).populate("projects").populate("archive").exec((err, foundUser) => {
            if (err) {
                console.error(err);
                res.status(404);
                res.send(err);
            } else if (!foundUser) {
                res.status(404);
                res.send('unable to find a user with that id');
            } else {
                res.status(200);
                res.json(foundUser);
            }
        });
    } catch (err) {
        res.status(404);
        res.send(err);
    }
})

.post('/', (req, res) => {
    let body = req.body;
    let newUser = {};
    newUser.username = body.username;
    newUser.name = { first: body.name.first, last: body.name.last};
    newUser.birthday = { day: body.birthday.day, month: body.birthday.month, year: body.birthday.year};
    newUser.login = {};
    newUser.login.email = { login: body.email, password: body.password }
    if (body.experiences !== []) {
        newUser.experiences = [];
        body.experiences.forEach((exp) => newUser.experiences.push(exp));
    }
    if (body.interests !== []) {
        newUser.interests = [];
        body.interests.forEach((e) => newUser.interests.push(e));
    }

    User.create(newUser, (err, User) => {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            console.info(`User ${User.username} has been created`);
            res.send('success');
        }
    });
})

module.exports = router;