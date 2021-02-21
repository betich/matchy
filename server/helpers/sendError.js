function sendError(req, res, err) {
    console.log("================================================");
    console.error(err);
    
    const ErrCode = err.status || 500; 
    res.status(ErrCode).send(err.message);
}

module.exports = sendError;