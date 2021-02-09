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

module.exports = router;