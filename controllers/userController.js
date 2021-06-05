const Users = require('../models/Users')

exports.createAccountForm = (req, res) => {
    res.render('createAccount', {
        pageName: 'Create Account on UpTask'
    })
}

exports.createAccount = async (req, res, next) => {
    const {email, password} = req.body

    Users.create({
        email,
        password
    }).then(() => {
        res.redirect('/sing-in')
    })
}