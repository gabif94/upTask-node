const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyects = require('./Proyects')

const Tasks = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    task: Sequelize.STRING(100),
    state: Sequelize.INTEGER(1)
})
Tasks.belongsTo(Proyects)

module.exports = Tasks