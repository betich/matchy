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
    delete newProject["projectname"];

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

.get('/:id', (req, res) => {
    try {
        Project.findById(req.params.id).populate("owner").populate("workers").exec((err, foundProject) => {
            if (err) {
                throw err;
            } else if (!foundProject) {
                res.status(404);
                res.send('unable to find a project with that id');
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
        console.log('project delete request come id: ่่' + req.params.id);
        Project.findByIdAndDelete(req.params.id, (err,foundProject) => {
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
        console.log(err);
        console.log('error occur');
        res.status(500).send(err);
    }
})

.put('/:id',upload.none(), (req,res) => {
    let newProject = Object.assign({}, req.body);
    newProject.name = req.body.projectname;
    delete newProject["projectname"];
    console.log(newProject);
    try {
        Project.findByIdAndUpdate(req.params.id, newProject, (err, foundProject) => {
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