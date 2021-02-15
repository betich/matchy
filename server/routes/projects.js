const express = require('express');
const User = require('../models/users');
const Project = require('../models/projects');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const filterFalsy = require('../helpers/filterFalsy');
const auth = require('../middleware/index');

const ObjectId = require('mongoose').Types.ObjectId;

router
.get('/', auth.checkLogin,(req, res) => {
    try {
        Project.find({ $or: [{owner: new ObjectId(req.user._id)}, {workers: new ObjectId(req.user._id)}] })
        .populate("owner").populate("workers")
        .exec((err, allProjects) => {
            if (err) throw err;
            else if (!allProjects) {
                res.status(404).send('unable to find projects');
            } else {
                res.status(200).json(allProjects);
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

.post('/', auth.checkLogin, upload.none(), (req, res) => {
    let newProject = Object.assign({}, req.body);
    newProject.name = req.body.projectname;
    delete newProject["projectname"]; // rename projectname=>name
    try {
        User.findById(req.user._id, (err, foundUser) => {
            if (err) throw err;
            Project.create(filterFalsy(newProject), async (err, newProject) => {
                if (err) throw err;
                else {
                    newProject.owner = req.user._id;
                    foundUser.projects.push({
                        projectid: newProject._id,
                        name: newProject.name,
                        role: "owner"
                    });
                    const [user, project] = await Promise.all([foundUser.save(), newProject.save()])
                    
                    console.info(`Project ${project.name} has been created`);
                    res.json(project);
                }
            })
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

.get('/checkownership/:id', auth.checkProjectOwnership, (req,res) => {
    res.status(200).send(req.user);
})

.get('/:id', (req, res) => {
    try {
        Project.findById(req.params.id).populate("owner").populate("workers").exec((err, foundProject) => {
            if (err) {
                res.status(500).send(err);
                throw err;
            } else if (!foundProject) {
                res.status(404).send('unable to find a project with that id');
            } else {
                res.status(200);
                res.json(foundProject);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

.delete('/:id', auth.checkProjectOwnership, (req,res) => {
    try {
        Project.findById(req.params.id,
        { useFindAndModify: false },
        async (err,foundProject) => {
            if (err) throw err;
            else if (!foundProject) {
                res.status(404).send('no project found');
            }
            else {
                await foundProject.remove((err, deletedProject) => {
                    if (err) throw err;
                    else {
                        res.status(200).send('deleted ' + deletedProject.name);
                        console.log('deleted่ project ' + deletedProject.name);
                    }
                })
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

.put('/:id',[upload.none(), auth.checkProjectOwnership], (req,res) => {
    let newProject = Object.assign({}, req.body);
    newProject.name = req.body.projectname;
    delete newProject["projectname"];
    try {
        Project.findByIdAndUpdate(req.params.id, newProject, { useFindAndModify: false }, (err, foundProject) => {
            if (err) throw err;
            if (!foundProject) {
                res.status(404).send('no project found');
            } else {
                res.status(200);
                res.json(foundProject);
            } 
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;