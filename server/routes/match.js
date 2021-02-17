const express = require('express');
const auth = require('../middleware/index');
const router = express.Router();
const Project = require('../models/projects');
const User = require('../models/users');
const sendError = require('../helpers/sendError');

router
.get('/', auth.checkLogin, (req, res) => {
    try {
        // estimatedDocumentCount() - O(1)
        // countDocuments({}) - O(n)
        Project.estimatedDocumentCount().exec((err, count) => {
            if (err) throw err;
            const random = Math.floor(Math.random() * count);

            Project.findOne()
                .populate("owner")
                .populate("workers")
                .skip(random)
                .exec((err, result) => {
                    if (err) throw err;
                    res.status(200).send(result);
                });
        });
    } catch (err) {
        sendError(req, res, err);
    }
})

.post('/a/:id', auth.checkLogin, (req, res) => {
    Project.findById(req.params.id).populate("owner")
        .then((foundProject) => {
            if (foundProject) {
                foundProject.workers.push(req.user._id);
                foundProject.save((err) => {
                    if (err) throw err;
                });
                return foundProject;
            } else {
                res.status(404).send("can't find the project you're looking for");
            }
        })
        .then((foundProject) => {
            try {
                User.findById(req.user._id, (err, foundUser) => {
                    if (err) throw err;
                    else {
                        foundUser.projects.push({
                            info: foundProject._id,
                            role: "worker"
                        })

                        foundUser.save((err) => {
                            if (err) throw err;
                            res.status(200).send(foundProject);
                        });
                    }
                })
            } catch (err) {
                sendError(req, res, err);
            }
        })
        .catch((err) => sendError(req, res, err))
})

module.exports = router;
