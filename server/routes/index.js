const User = require('../models/users');
const express = require('express');
const multer = require('multer');
const filterFalsy = require('../helpers/filterFalsy');
const auth = require('../middleware/index');
const passport = require('passport');
const hash = require('../helpers/hash');
const sendError = require('../helpers/sendError');
const router = express.Router();
const upload = multer();

router
.get('/checkLogin', auth.checkLogin, (req, res) => {
    res.status(200).json(req.user);
})

.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('logged in');
})

.post('/register', upload.none(), (req, res) => {
    const { salt, hashed } = hash.hashPassword(req.body.password);
    User.findOne({username: new RegExp('\\b' + req.body.username + '\\b', 'i')})
        .then((foundUser) => {
            if (foundUser) {
                res.status(409).send('duplicate user');
            } else {
                let newUser = Object.assign({}, req.body);

                delete newUser["password"];
                newUser.salt = salt;
                newUser.hash = hashed;
            
                const exp = newUser.experiences;
                for (const e in exp) {
                    newUser.experiences[e] = JSON.parse(exp[e]);
                }

                return newUser;
            }
        })
        .then((newUser) => {
            User.create(filterFalsy(newUser), (err, User) => {
                try {
                    if (err) throw err;
                    else {
                        req.login(User, (err) => {
                            if (err) throw err;
                            else res.status(200).json(User);
                        })
                        console.info(`User ${User.username} has been created`);
                    }
                }
                catch (err) {
                    sendError(req, res, err);
                }
            });
        })
        .catch((err) => sendError(req, res, err))
})

.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
})

module.exports = router;