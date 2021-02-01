const express = require('express');
const Project = require('../models/projects');
const router = express.Router();
const filterFalsy = require('../helpers/filterFalsy');

router
.get('/', (req, res) => {
    Project.find({})/*.populate(owner).populate(workers)*/.exec((err, allProjects) => {
        if (err) {
            console.error(err);
            res.send(err);
        }
        else {
            res.json({projects: allProjects});
        }
    });
})

.post('/', (req, res) => {
    let newProject = req.body;

    Project.create(filterFalsy(newProject), (err, project) => {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            console.info(`${project.name} has been created`);
            res.send('success');
        }
    });
})

.get('/:id', (req, res) => {
    Project.findById(req.params.id)/*.populate("owner").populate("workers")*/.exec((err, foundProject) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else if (!foundProject) {
            res.send('unable to find a project with that id');
        } else {
            // add user object to to project
            res.json({project: foundProject});
        }
    });
})

module.exports = router;