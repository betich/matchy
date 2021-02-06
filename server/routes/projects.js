const express = require('express');
const Project = require('../models/projects');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const filterFalsy = require('../helpers/filterFalsy');

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
    delete newProject["projectname"];

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

.get('/:id', (req, res) => {
    try {
        Project.findById(req.params.id).populate("owner").populate("workers").exec((err, foundProject) => {
            if (err) {
                console.error(err);
                res.status(500);
                res.send(err);
            } else if (!foundProject) {
                res.status(404);
                res.send('unable to find a project with that id');
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

// TODO: Check deletetion authority
.delete('/:id', (req,res) => {
    try {
        console.log('delete request come ่่' + req.params.id);
        Project.findByIdAndDelete(req.params.id, (err,foundProject) => {
            if (err) {
                res.status(500);
                console.error(err);
                res.send(err);
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
        console.log(err);
        console.log('error occur');
        res.status(404);
        res.send(err);
    }
})

module.exports = router;