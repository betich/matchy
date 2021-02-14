const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Project = require('../models/projects');
const multer = require('multer');
const upload = multer();
const filterFalsy = require('../helpers/filterFalsy');
const auth = require('../middleware/index');

router
.get('/', (req, res) => {
    try {
        User.find({}).populate("projects").populate("archive").exec((err, foundUsers) => {
            if (err) {
                res.status(404).send(err);
                console.error(err);
            } else if (!foundUsers) {
                res.status(404).send('unable to find users');
            } else {
                res.status(200).json(foundUsers);
            }
        });
    } catch (err) {
        res.status(404).send(err);
    }
})

.get('/checkownership/:id', auth.checkUser, (req,res) => {
    res.status(200).send(req.user);
})

.get('/:id', (req, res) => {
    try {
        User.findById(req.params.id).populate("projects").populate("archive").exec((err, foundUser) => {
            if (err) {
                res.status(404).send(err);
                console.error(err);
            } else if (!foundUser) {
                res.status(404).send('unable to find a user with that id');
            } else {
                res.status(200).json(foundUser);
            }
        });
    } catch (err) {
        res.status(404).send(err);
    }
})

.delete('/:id', auth.checkUser, (req,res) => {
    try {
        User.findById(req.params.id, async (err, foundUser) => {
            if (err) throw err;
            else if (!foundUser) {
                res.status(404).send('no user found');
            }
            else {
                foundUser.remove((err, deletedUser) => {
                    if (err) throw err;
                    else {
                        console.log('deleted '+ deletedUser.username);
                        res.status(200).send('deleted ' + deletedUser.username);
                    }
                });
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

.put('/:id', upload.none(), (req,res) => {
    try {
        let newUser = req.body;
        const exp = newUser.experiences;
        for (const e in exp) {
            newUser.experiences[e] = JSON.parse(exp[e]);
        }

        User.findByIdAndUpdate(req.params.id, filterFalsy(newUser), { useFindAndModify: false }, (err, foundUser) => {
            if (err) throw err;
            else if (!foundUser) {
                res.status(404).send('no project found');
            } else {
                res.status(200).send('update sucessfully');
            }
        })
    } catch (err) {
        res.status(404).send(err);
        console.error(err);
    }
})

module.exports = router;