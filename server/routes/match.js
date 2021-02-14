const express = require("express");
const auth = require("../middleware/index");
const passport = require("passport");
const hash = require("../helpers/hash");
const router = express.Router();
const Project = require("../models/projects");

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        Project.count().exec(function (err, count) {
            var random = Math.floor(Math.random() * count);

            Project.findOne()
                .skip(random)
                .exec(function (err, result) {
                    res.status(200).send(result);
                });
        });
    } else {
        res.status(401).send('Not Authorized');
    }
});

module.exports = router;
