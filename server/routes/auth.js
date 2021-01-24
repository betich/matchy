const express = require('express');
const router = express.Router();

router
.get('/', (req, res) => {
    res.json({msg: 'some auth data'});
})

.post('/', (req, res) => {
    
})

module.exports = router;