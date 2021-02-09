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
                console.error(err);
                res.status(404);
                res.send(err);
            } else if (!allProjects) {
                res.status(404);
                res.send('unable to find projects');
            } else {
                res.status(200);
                res.json(allProjects);
            }
        })
    } catch (err) {
        res.status(404);
        res.send(err);
    }
})

.post('/', upload.none(), (req, res) => {
    let newProject = Object.assign({}, req.body);
    newProject.name = req.body.projectname;
    delete newProject["projectname"]; // rename projectname=>name

    Project.create(filterFalsy(newProject), (err, project) => {
        if (err) {
            console.error(err);
            res.status(404);
            res.send(err);
        } else {
            console.info(`${project.name} has been created`);
            res.json(project);
        }
    });
})

.get('/:id', auth.checkAuth, (req, res) => {
    try {
        Project.findById(req.params.id).populate("owner").populate("workers").exec((err, foundProject) => {
            if (err) {
                console.error(err);
                res.status(404).send(err);
            } else if (!foundProject) {
                res.status(404).send('unable to find a project with that id');
            } else {
                res.status(200);
                res.json(foundProject);
            }
        });
    } catch (err) {
        res.status(404);
        res.send(err);
    }
})

module.exports = router;