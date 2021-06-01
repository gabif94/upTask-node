const express = require('express');
const routes = require('./routes');
const path = require('path');
const helpers = require('./helpers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = require('./config/db');

require('./models/Proyects');

db.sync()
	.then(() => console.log('connection successfull'))
	.catch(err => console.log(err));

app.use(express.static('public'));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './views'));

app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	next();
});

app.use('/', routes());

app.listen(3001);
