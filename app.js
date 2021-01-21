const express = require('express');
const app = express();

const PORT = process.env.PORT || 3410;

app.get('/api', (req, res) => {
    res.send('hi from the api');
});

app.get('/match', (req, res) => {
    res.send('matching page');
});

app.listen(PORT, () => {
	console.info('\x1b[44m%s\x1b[0m', 'ready');
});