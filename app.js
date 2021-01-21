const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.json({msg: 'hi from the api'});
});

app.get('/match', (req, res) => {
    res.json({msg: 'matching page'});
});

const PORT = process.env.PORT || 3410;

app.listen(PORT, () => {
	console.info('\x1b[44m%s\x1b[0m', 'ready');
});