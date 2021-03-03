const express = require('express');
const User = require('../models/users');
const Project = require('../models/projects');
const router = express.Router();
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
                let Err = new Error("unable to find any users");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err));
})

.get('/me', auth.checkLogin, (req, res) => {
    User.findById(req.user._id).populate('projects').populate('archive')
        .then((foundUser) => {
            if (foundUser) {
                res.status(200).json(foundUser);
            } else {
                let Err = new Error("unable to find any user");
                Err.status = 404;
                throw Err;
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
                let Err = new Error("can't find that user");
                Err.status = 404;
                throw Err;
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
                let Err = new Error("can't find that user");
                Err.status = 404;
                throw Err;
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
                        console.info('deleted '+ deletedUser.username);
                    }
                });
            } else {
                let Err = new Error("can't find that user");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err))
})

.put('/:username', auth.checkUserByUsername , (req,res) => {
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
                let Err = new Error("can't find that user");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err))
})

module.exports = router;