const {Sequelize} = require('sequelize');
require('dotenv').config({path: 'variables.env'});

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	process.env.BD_NOMBRE,
	process.env.BD_USER,
	process.env.BD_PASS,
	{
		host: process.env.BD_HOST,
		dialect: 'mysql',
	}
);

module.exports = sequelize;
