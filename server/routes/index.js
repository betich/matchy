const User = require('../models/users');
const express = require('express');
const multer = require('multer');
const filterFalsy = require('../helpers/filterFalsy');
const auth = require('../middleware/index');
const passport = require('passport');
const hash = require('../helpers/hash');
const router = express.Router();
const upload = multer();

router
.get('/checkLogin', auth.checkAuth, (req, res) => {
    res.status(200).send('logged in');
})

.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('logged in');
})

.post('/register', upload.none(), (req, res) => {
    const saltHash = hash.hashPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hashed = saltHash.hash;
    let newUser = Object.assign({}, req.body);
    delete newUser["password"];
    newUser.salt = salt;
    newUser.hash = hashed;

    User.create(filterFalsy(newUser), (err, User) => {
        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            console.info(`User ${User.username} has been created`);
            res.status(200).json(User);
        }
    });
})

.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
})

module.exports = router;