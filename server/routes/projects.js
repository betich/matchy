const express = require('express');
const User = require('../models/users');
const Project = require('../models/projects');
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
                res.status(404).send("unable to find projects");
            }
        })
        .catch((err) => sendError(req, res, err))
})

.post('/', [auth.checkLogin, upload.none()], (req, res) => {
    Project.findOne({ name: req.body.projectname })
        .then((foundProject) => {
            if (foundProject) {
                res.status(409).send('duplicate project');
                return null;
            } else {
                let newProject = Object.assign({}, req.body);
                
                newProject.name = req.body.projectname;
                newProject.url = slug(req.body.projectname, '_', {lower: false});
                newProject.questions = [];
                req.body.formquestions.forEach(elem => newProject.questions.push(JSON.parse(elem)));

                delete newProject["projectname"]; // rename projectname=>name
                delete newProject["formquestions"];
                console.log(newProject);

                return newProject;
            }
        })
        .then((newProject) => {
            if (!newProject) return null;
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
                                res.status(404).send("can't find the project");
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
                res.status(404).send("unable to find a project with that id");
            }
        })
        .catch((err) => sendError(req, res, err))
})

.get('/:user/:project', (req, res) => {
    User.findOne({ username: req.params.user }).populate("projects.info")
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
                let Err = new Error("unable to the project");
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

.put('/:id', [upload.none(), auth.checkProjectOwnership], (req,res) => {
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
                res.status(404).send("unable to find the project");
            }
        })
        .catch((err) => sendError(req, res, err))
})

.delete('/:id', auth.checkProjectOwnership, (req,res) => {
    Project.findById(
            req.params.id,
            { useFindAndModify: false }
        )
        .then((foundProject) => {
            if (foundProject) {
                return foundProject;
            } else {
                res.status(404).send("unable to find the project");
                return null;
            }
        })
        .then((foundProject) => {
            if (!foundProject) return null;
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