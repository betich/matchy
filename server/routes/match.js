const express = require('express');
const auth = require('../middleware/index');
const router = express.Router();
const Project = require('../models/projects');
const User = require('../models/users');
const sendError = require('../helpers/sendError');

router
.get('/', auth.checkLogin, async (req, res) => {
    try {
        // check if project responses already contain responses made by user
        await Project.aggregate([
            { $match: {
                $and: [
                    {owner: { $ne: req.user._id }},
                    {workers: { $ne: req.user._id }}
                ]
            }}
        ])
        .exec((err, results) => {
            if (err) throw err;
            Project.populate(results, ['owner', 'workers', 'responses'],
                (err, foundProjects) => {
                    if (err) throw err;
                    // save rsponse to user
                    // delete response from user when owner responds
                    // fix below

                    foundProjects = foundProjects.filter((oneProject) => {
                        let userAlreadyResponed = false;
                        if (oneProject.responses) {
                            oneProject.responses.forEach((prResponse) => {
                                if (prResponse.user.equals(req.user._id)) {
                                    userAlreadyResponed = true;
                                }
                            })
                        }

                        return !userAlreadyResponed
                    })

                    let randIdx = Math.floor(Math.random() * foundProjects.length);
                    res.status(200).json(foundProjects[randIdx]);
                });
        });
    } catch (err) {
        sendError(req, res, err);
    }
})

.get('/questions/:id', auth.checkLogin, (req, res) => {
    Project.findById(req.params.id)
        .populate("responses").populate("owner", "_id").populate("workers", "_id")
        .then((foundProject) => {
            if (!foundProject) {
                let Err = new Error("unable to the project");
                Err.status = 404;
                throw Err;
            }
            else {
                // if there are no questions, continue
                if (foundProject.questions.length > 0) {
                    res.status(202).json(foundProject.questions);
                } else {
                    let alreadyJoined = false;

                    if (foundProject.owner._id.equals(req.user._id)) alreadyJoined = true;
                    foundProject.workers.forEach((worker) => {
                        if (worker._id.equals(foundUser._id)) {
                            alreadyJoined = true;
                        }
                    })

                    if (alreadyJoined) {
                        let Err = new Error("duplicate project");
                        Err.status = 404;
                        throw Err;
                    }
                    else return foundProject
                }
            } 
        })
        .then(async (foundProject) => {
            if (!foundProject) return null;
            let foundUser = await User.findById(req.user._id);
            foundProject.workers.push(req.user._id);

            foundUser.projects.push({
                info: foundProject._id,
                role: "worker"
            })

            const [user, project] = await Promise.all([foundUser.save(), foundProject.save()])
            res.status(200).send(project);
        })
        .catch((err) => {
            sendError(req, res, err);
        })
})

module.exports = router;
