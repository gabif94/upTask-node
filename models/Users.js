const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyects = require('./Proyects')
const bcrypt = require('bcrypt')

const Users = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false

    },
    password: {
        type: Sequelize.STRING(40),
        allowNull: false
    }
},
{
    hooks: {
        beforeCreate(user){
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        }
    }
})

Users.hasMany(Proyects)

module.exports = Users