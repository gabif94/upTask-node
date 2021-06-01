const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyects = db.define(
	'proyects',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: Sequelize.STRING,
		url: Sequelize.STRING,
	},
	{
		hooks: {
			beforeCreate(proyect) {
				const url = slug(proyect.name).toLowerCase();
				proyect.url = `${url}-${shortid.generate()}`;
			},
		},
	}
);

module.exports = Proyects;
