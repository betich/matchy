const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const upload = multer();
const filterFalsy = require('../helpers/filterFalsy');

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

.post('/', upload.none(), (req, res) => {
    let newUser = req.body;

    User.create(filterFalsy(newUser), (err, User) => {
        if (err) {
            console.error(err);
            res.status(404);
            res.send(err);
        } else {
            console.info(`User ${User.username} has been created`);
            res.json(User);
        }
    });
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