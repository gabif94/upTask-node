const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyects = require('./Proyects');
const bcrypt = require('bcrypt');

const Users = db.define(
	'users',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: Sequelize.STRING(60),
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'Invalid Email',
				},
				notEmpty: {
					msg: 'Email cannot be empty',
				},
			},
			unique: {
				args: true,
				msg: 'User already exists',
			},
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Password cannot be empty',
				},
			},
		},
	},
	{
		hooks: {
			beforeCreate(user) {
				user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
			},
		},
	}
);

Users.prototype.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

// Users.hasMany(Proyects);

module.exports = Users;
