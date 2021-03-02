const express = require('express');
const User = require('../models/users');
const Project = require('../models/projects');
const Response = require('../models/responses');
const router = express.Router();
const slug = require('slug');
const multer = require('multer');
const upload = multer();
const auth = require('../middleware/index');
const filterFalsy = require('../helpers/filterFalsy');
const sendError = require('../helpers/sendError');

const ObjectId = require('mongoose').Types.ObjectId;

router
.get('/', auth.checkLogin,(req, res) => {
    Project.find({ $or: [{owner: new ObjectId(req.user._id)}, {workers: new ObjectId(req.user._id)}] })
        .populate("owner").populate("workers")
        .then((allProjects) => {
            if (allProjects) {
                res.status(200).json(allProjects);
            } else {
                let Err = new Error("unable to find the project");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err))
})

.post('/', [auth.checkLogin], (req, res) => {
    Project.findOne({ name: req.body.projectname })
        .then((foundProject) => {
            if (foundProject) {
                let Err = new Error("duplicate project");
                Err.status = 409;
                throw Err;
            } else {
                let newProject = Object.assign({}, req.body);
                
                newProject.name = req.body.projectname;
                newProject.url = slug(req.body.projectname, '_', {lower: false});
                newProject.questions = [];
                req.body.questions.forEach(elem => newProject.questions.push(elem));

                delete newProject["projectname"]; // rename projectname=>name
                delete newProject["formquestions"];

                return newProject;
            }
        })
        .then((newProject) => {
            Project.create(filterFalsy(newProject), async (err, newProject) => {
                if (err) sendError(req, res, err);
                else {
                    let foundUser = await User.findById(req.user._id);
                    newProject.owner = req.user._id;
                    foundUser.projects.push({
                        info: newProject._id,
                        role: "owner"
                    });
                    const [user, project] = await Promise.all([foundUser.save(), newProject.save()])
                    
                    console.info(`Project ${project.name} has been created`);
                    Project.findById(newProject._id).populate("owner")
                        .then((populatedProject) => {
                            if (populatedProject) {
                                res.status(200).json(populatedProject);
                            } else {
                                let Err = new Error("can't find the project you're looking for!");
                                Err.status = 404;
                                throw Err;
                            }
                        })
                        .catch((err) => sendError(req, res, err))
                }
            })
        })
        .catch((err) => sendError(req, res, err))
})

.get('/checkownership/:id', auth.checkProjectOwnership, (req,res) => {
    res.status(200).send(req.user);
})

.get('/i/:id', (req, res) => {
    Project.findById(req.params.id).populate("owner").populate("workers")
        .then((foundProject) => {
            if (foundProject) {
                res.status(200).json(foundProject);
            } else {
                let Err = new Error("can't find the project you're looking for");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err))
})

.get('/answer/:id', auth.checkProjectOwnership, (req,res) => {
    Project.findById(req.params.id)
        .then((foundProject) => {
            if (foundProject) {
                return foundProject;
            } else {
                let Err = new Error("unable to find the project");
                Err.status = 404;
                throw Err;
            }
        })
        .then((foundProject) => {
            Project.populate(foundProject, ['responses'], (err, populatedProject) => {
                if (err) throw err;
                Response.populate(populatedProject.responses, ['user', 'project'], (err, populatedResponses) => {
                    if (err) throw err;
                    res.status(200).send(populatedResponses);
                })
            })
        })
        .catch((err) => sendError(req, res, err))
})

.post('/answer/:id', auth.checkLogin, (req, res) => {
    Project.findById(req.params.id)
        .populate("responses")
        .then(async (foundProject) => {
            let alreadyReponded = false;
            let foundUser = await User.findById(req.user._id);
            foundProject.responses.forEach((response) => {
                if (response.user.equals(req.user._id)) {
                    alreadyReponded = true;
                }
            })

            if (alreadyReponded) {
                res.status(409).send("duplicate project");
            } else {
                let response = {};
                response.answers = req.body;
                response.user = req.user._id;
                response.project = foundProject._id;

                Response.create(response, async (err, response) => {
                    if (err) throw err;
                    foundProject.responses.push(response);
                    foundUser.responses.push(response);

                    const [user, project] = await Promise.all([foundUser.save(), foundProject.save()]);
                    
                    res.status(200).json(project);
                    console.info('new response added');
                })
            }
        })
        .catch((err) => {
            sendError(req, res, err);
        })
})

.get('/accept/:id', auth.checkProjectOwnership, (req, res) => {
    // query = r: response id
    if (!req.query.r) return res.status(404).send("please specify the response id");
    Project.findById(req.params.id)
        .populate("responses")
        .then(async (foundProject) => {
            let foundUser = await User.findById(req.user._id);
            const respIdx = foundProject.responses.findIndex((resp) => {
                return resp._id.equals(req.query.r);
            })

            if (respIdx !== -1) {
                foundProject.responses.splice(respIdx, 1);
                foundProject.workers.push(req.user._id);

                foundUser.projects.push({
                    info: foundProject._id,
                    role: "worker"
                })

                const [user, project] = await Promise.all([foundUser.save(), foundProject.save()])
                
                Response.populate(project.responses, ['user', 'project'], (err, populatedResponses) => {
                    if (err) throw err;
                    res.status(200).send(populatedResponses);
                })
            } else {
                let Err = new Error("can't any responses from this user");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err))
})

.get('/reject/:id', auth.checkProjectOwnership, (req, res) => {
    if (!req.query.r) return res.status(404).send("please specify the response id");
    Project.findById(req.params.id)
        .populate("responses")
        .then(async (foundProject) => {
            const respIdx = foundProject.responses.findIndex((resp) => {
                return resp._id.equals(req.query.r);
            })

            if (respIdx !== -1) {
                foundProject.responses.splice(respIdx, 1);

                const project = await foundProject.save();
                
                Response.populate(project.responses, ['user', 'project'], (err, populatedResponses) => {
                    if (err) throw err;
                    res.status(200).send(populatedResponses);
                })
            } else {
                let Err = new Error("can't any responses from this user");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err))
})

.get('/:user/:project', (req, res) => {
    User.findOne({ username: req.params.user })
        .populate("projects.info")
        .then((foundUser) => {
            if (foundUser) {
                return foundUser;
            } else {
                let Err = new Error("unable to find a user with that username");
                Err.status = 404;
                throw Err;
            }
        })
        .then((foundUser) => {
            if (!foundUser) return null;
            let foundProject = null;
            
            foundUser.projects.forEach((project) => {
                if (project.info.url === req.params.project) {
                    foundProject = project.info;
                }
            })

            return foundProject;
        })
        .then((foundProject) => {
            if (!foundProject) {
                let Err = new Error("unable to find the project");
                Err.status = 404;
                throw Err;
            }
            else {
                Project.populate(foundProject, ['owner', 'workers'],
                    (err, populatedProject) => {
                        if (err) sendError(req, res, err);
                        else res.status(200).json(populatedProject);
                    });
            }
        })
        .catch((err) => {
            sendError(req, res, err);
        })
})

.put('/:id', auth.checkProjectOwnership, (req, res) => {
    let newProject = Object.assign({}, req.body);
    newProject.name = req.body.projectname;
    newProject.url = slug(req.body.projectname, '_', {lower: false});
    delete newProject["projectname"];
    
    Project.findByIdAndUpdate(req.params.id, newProject, { useFindAndModify: false })
        .populate("owner")
        .then((foundProject) => {
            if (foundProject) {
                console.info(`Project ${foundProject.name} has been updated`);
                res.status(200).json({newurl: newProject.url, owner: foundProject.owner.username});
            } else {
                let Err = new Error("can't find the project you're looking for");
                Err.status = 404;
                throw Err;
            }
        })
        .catch((err) => sendError(req, res, err))
})

.delete('/:id', auth.checkProjectOwnership, (req, res) => {
    Project.findById(
            req.params.id,
            { useFindAndModify: false }
        )
        .then((foundProject) => {
            if (foundProject) {
                return foundProject;
            } else {
                let Err = new Error("can't find the project you're looking for!");
                Err.status = 404;
                throw Err;
            }
        })
        .then((foundProject) => {
            foundProject.remove((err, deletedProject) => {
                if (err) sendError(req, res, err);
                else {
                    res.status(200).send('deleted ' + deletedProject.name);
                    console.log('deleted่ project ' + deletedProject.name);
                }
            })
        })
        .catch((err) => sendError(req, res, err))
});

module.exports = router;