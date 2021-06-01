const {Sequelize} = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('uptasknode', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;
