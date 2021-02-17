function sendError(req, res, err) {
    console.log("================================================");
    console.error(err);
    res.status(500).send(err);
}

module.exports = sendError;