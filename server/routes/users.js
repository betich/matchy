const express = require('express');
const User = require('../models/users');
const Project = require('../models/projects');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const filterFalsy = require('../helpers/filterFalsy');
const auth = require('../middleware/index');
const usernameRegex = require('../helpers/usernameRegex');
router
.get('/', (req, res) => {
    User.find({}).populate('projects').populate('archive')
        .then((foundUsers) => {
            if (foundUsers) {
                res.status(200).json(foundUsers);
            } else {
                res.status(404).send('unable to find any users');
            }
        })
        .catch((err) => sendError(req, res, err));
})

.get('/checkownership/:username', auth.checkUserByUsername, (req, res) => {
    res.status(200).send(req.user);
})

.get('/i/:id', (req, res) => {
    User.findById(req.params.id)
        .then((foundUser) => {
            if (foundUser) {
                res.status(200).json(foundUser);
            } else {
                res.status(404).send("unable to find a user with that id");
            }
        })
        .catch((err) => sendError(req, res, err))
})

.get('/:username', (req, res) => {
    User.findOne({username : usernameRegex(req.params.username)})
        .then((foundUser) => {
            if (foundUser) {
                res.status(200).send(foundUser);
            } else {
                res.status(400).send("unable to find a user with that username")
            }
        })
        .catch((err) => sendError(req, res, err))
})

.delete('/:username', auth.checkUser, (req,res) => {
    User.findOne(
            { username: usernameRegex(req.params.username) }
        )
        .then(async (foundUser) => {
            if (foundUser) {
                await foundUser.remove((err, deletedUser) => {
                    if (err) throw err;
                    else {
                        res.status(200).send('deleted ' + deletedUser.username);
                        console.log('deleted '+ deletedUser.username);
                    }
                });
            } else {
                res.status(404).send("unable to find a user with that username");
            }
        })
        .catch((err) => sendError(req, res, err))
})

.put('/:username', [auth.checkUserByUsername, upload.none()] , (req,res) => {
    let newUser = req.body;
    const exp = newUser.experiences;
    for (const e in exp) {
        newUser.experiences[e] = JSON.parse(exp[e]);
    }

    User.findOneAndUpdate(
            { username: usernameRegex(req.params.username)}, filterFalsy(newUser),
            { useFindAndModify: false }
        )
        .then((foundUser) => {
            if (foundUser) {
                res.status(200).send("updated sucessfully");
            } else {
                res.status(404).send("no project found");
            }
        })
        .catch((err) => sendError(req, res, err))
})

module.exports = router;