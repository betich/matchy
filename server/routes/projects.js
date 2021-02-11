const express = require('express');
const Project = require('../models/projects');
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

.post('/', upload.none(), (req, res) => {
    let newProject = Object.assign({}, req.body);
    newProject.name = req.body.projectname;
    newProject.owner = req.user.id;
    delete newProject["projectname"]; // rename projectname=>name
    try {
        Project.create(filterFalsy(newProject), (err, project) => {
            if (err) {
                throw err;
            } else {
                console.info(`${project.name} has been created`);
                res.json(project);
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

.get('/checkauthority/:id', (req,res) => {
    if (req.isAuthenticated()) {
        // Is the user authorized?
        Project.findById(req.params.id, (err, foundProject) => {
            if (foundProject.owner._id.equals(req.user._id)) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        });
    } else {
        res.status(200).send(false);
    }
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