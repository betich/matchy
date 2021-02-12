const express = require('express');
const Project = require('../models/projects');
const User = require('../models/users');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const filterFalsy = require('../helpers/filterFalsy');
const auth = require('../middleware/index');

router
.get('/', (req, res) => {
    try {
        Project.find({}).populate("owner").populate("workers").exec((err, allProjects) => {
            if (err) {
                throw err;
            } else if (!allProjects) {
                res.status(404);
                res.send('unable to find projects');
            } else {
                res.status(200);
                res.json(allProjects);
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
        User.findById(req.user._id, (err, user) => {
            if (err) throw err;
            Project.create(filterFalsy(newProject), (err, project) => {
                if (err) throw err;
                else {
                    project.owner = req.user._id;
                    project.save();
                    user.projects.push({
                        projectid: project._id,
                        role: "owner"
                    });
                    user.save();
                    
                    console.info(`${project.name} has been created`);
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

// TODO: Check deletetion authority
.delete('/:id', (req,res) => {
    try {
        console.log('deleted่' + req.params.id);
        Project.findByIdAndDelete(req.params.id, { useFindAndModify: false }, (err,foundProject) => {
            if (err) {
                throw err;
            }
            else if (!foundProject) {
                res.status(404);
                res.send('no project found');
            } 
            else {
                res.status(200);
                res.send({});
            } 
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

.put('/:id',upload.none(), (req,res) => {
    let newProject = Object.assign({}, req.body);
    newProject.name = req.body.projectname;
    delete newProject["projectname"];
    console.log(newProject);
    try {
        Project.findByIdAndUpdate(req.params.id, newProject, { useFindAndModify: false }, (err, foundProject) => {
            if (err) {
                throw err;
            }
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