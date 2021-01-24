const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./server/models/users');
const Project = require('./server/models/projects');

const seedDB = require('./server/seeds');
const app = express();

const Routes = {
    users: require('./server/routes/users'),
    auth: require('./server/routes/auth'),
    projects: require('./server/routes/projects')
};

mongoose.connect(process.env.DATABASEURL || "mongodb://localhost:27017/planty",
    { useUnifiedTopology: true, useNewUrlParser: true /* autoIndex: false */}
).then(() => {
	console.log("DB connected");
}).catch(err => {
	console.error(err.message);
});

seedDB(); // set up up DB

app.use(cors());
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(methodOverride('_method'));
app.use(helmet());

app
.use('/app/users', Routes.users)
.use('/app/auth', Routes.auth)
.use('/app/projects', Routes.projects);

app.disable('x-powered-by');

const PORT = process.env.PORT || 3410;

app.listen(PORT, () => {
	console.info('ready');
});