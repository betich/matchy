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

// TODO: Check deletetion authority
.delete('/:id', (req,res) => {
    try {
        console.log('user delete request come id: ่่' + req.params.id);
        User.findByIdAndDelete(req.params.id, (err,foundUser) => {
            if (err) {
                res.status(500);
                console.error(err);
                res.send(err);
            }
            else if (!foundUser) {
                res.status(404);
                res.send('no project found');
            } 
            else {
                res.status(200);
                res.send({});
            } 
        })
    } catch (err) {
        console.log(err);
        console.log('error occur');
        res.status(404);
        res.send(err);
    }
})

.put('/:id', upload.none(), (req,res) => {
    try {
        let newUser = req.body;
        User.findByIdAndUpdate(req.params.id, filterFalsy(newUser), (err, foundProject) => {
            if (err) {
                throw err;
            } else if (!foundProject) {
                res.status(404);
                res.send('no project found');
            } else {
                res.status(200);
                res.send('update sucessfully');
            }
        })
    } catch (err) {
        console.error(err);
        res.status(404);
        res.send(err);
    }
})

module.exports = router;