const express = require("express");
const auth = require("../middleware/index");
const router = express.Router();
const Project = require("../models/projects");

router
.get("/", auth.checkLogin, (req, res) => {
    try {
        // estimatedDocumentCount() - O(1)
        // countDocuments({}) - O(n) 
        Project.estimatedDocumentCount().exec((err, count) => {
            if (err) throw err;
            const random = Math.floor(Math.random() * count);

            Project.findOne()
                .skip(random)
                .exec((err, result) => {
                    if (err) throw err;
                    res.status(200).send(result);
                });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;
