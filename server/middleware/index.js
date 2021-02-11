const Project = require('../models/projects');

const middleware = {
    checkAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).send("You need to be logged in first");
        }
    },
    checkProjectAuthority: (req, res, next) => {
        if (req.isAuthenticated()) {
            // Is the user authorized?
            Project.findById(req.params.id, (err, foundProject) => {
                if (err || !foundProject) {
                    res.status(404).send("Sorry, Your Project cannot be found!");
                }
                else if (foundProject.owner._id.equals(req.user._id)) {
                    next();
                } else {
                    res.status(403).send("You don't have permission to do that");
                }
            });
        } else {
            res.status(401).send("You need to be logged in first");
        }
    }
}

module.exports = middleware;