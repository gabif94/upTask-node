const express = require('express');
const routes = require('./routes');
const path = require('path');
const helpers = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = require('./config/db');

require('./models/Proyects');
require('./models/Tasks');
require('./models/Users');

db.sync()
	.then(() => console.log('connection successfull'))
	.catch(err => console.log(err));

app.use(express.static('public'));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './views'));

app.use(flash());

app.use(cookieParser());

app.use(
	session({
		secret: 'supersecret',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	res.locals.mesagges = req.flash();
	next();
});

app.use('/', routes());

app.listen(3001);
