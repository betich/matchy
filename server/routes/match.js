const express = require('express');
const auth = require('../middleware/index');
const router = express.Router();
const Project = require('../models/projects');
const User = require('../models/users');

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
        console.error(err);
        res.status(500).send(err);
    }
})

.post('/apply/:id', auth.checkLogin, (req, res) => {
    Project.findById(req.params.id)
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
                            projectid: foundProject._id,
                            name: foundProject.name,
                            role: "worker"
                        })

                        foundUser.save((err) => {
                            if (err) throw err;
                            res.status(200).send(foundProject);
                        });
                    }
                })
            } catch (err) {
                console.error(err);
                res.status(500).send(err);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })
})

module.exports = router;
