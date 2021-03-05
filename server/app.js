const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/users');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hash = require('./helpers/hash');
require('dotenv/config');

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')));

const Routes = {
	users: require('./routes/users'),
    index: require('./routes/index'),
    projects: require('./routes/projects'),
    match: require('./routes/match')
};

const DBURL = (process.env.NODE_ENV === 'production') ? process.env.DATABASEURL : process.env.LOCALDB;
mongoose.connect(DBURL || "mongodb://localhost:27017/matchy",
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true /* autoIndex: false */}
).then(() => {
	console.log("DB connected");
}).catch(err => {
	console.error(err.message);
});

const seedDB = require('./seeds');
// seedDB(); // set up DB

app.use(cors());
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(methodOverride('_method')); // delete later
app.use(helmet());


const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection })
app.use(session({
    secret: process.env.SECRET || "secret",
	resave: true,
	saveUninitialized: true,
	store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
	{
    	usernameField: 'login',
    	passwordField: 'password'
	}, (login, password, next) => {
        let loginType = (login.includes('@')) ? 'email' : 'username';
		User.findOne({ [loginType]: login })
        .then((user) => {
            if (!user) return next(null, false);
            // Function defined at bottom of app.js
            const isValid = hash.validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                return next(null, user);
            } else {
                return next(null, false);
            }
        })
        .catch((err) => {   
            next(err);
        });
	}
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, function (err, user) {
        if (err) return cb(err);
        else cb(null, user);
    });
});

app
.use('/app', Routes.index)
.use('/app/users', Routes.users)
.use('/app/projects', Routes.projects)
.use('/app/match', Routes.match);

app.get('*', (req, res) => {  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));});

app.disable('x-powered-by');

const PORT = process.env.PORT || 3410;

app.listen(PORT, () => {
	console.info('ready');
});