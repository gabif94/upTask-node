const passport = require('passport');
const Users = require('../models/Users');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const sendEmail = require('../handlers/email');

exports.autenticateUser = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true,
	badRequesstMessage: 'Both fields are required',
});

exports.userIsAutenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/login');
};

exports.signOff = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect('/login');
	});
};

exports.sendToken = async (req, res) => {
	const {email} = req.body;
	const user = await Users.findOne({where: {email}});

	if (!user) {
		req.flash('error', 'Account does not exist');
		res.redirect('/restore-password');
	}
	user.token = crypto.randomBytes(20).toString('hex');
	user.expiration = Date.now() + 3600000;

	await user.save();

	const resetUrl = `http://${req.headers.host}/restore-password/${user.token}`;

	await sendEmail.send({
		user,
		subject: 'Password reset',
		resetUrl,
		file: 'restorePassword',
	});

	req.flash('success', 'A message was sent to your email');
	res.redirect('/login');
};

exports.validateToken = async (req, res) => {
	const user = await Users.findOne({where: {token: req.params.token}});

	if (!user) {
		req.flash('error', 'Invalid');
		res.redirect('/restore-password');
	}
	res.render('resetPassword', {
		pageName: 'Restore Password',
	});
};

exports.updatePassword = async (req, res) => {
	const user = await Users.findOne({
		where: {
			token: req.params.token,
			expiration: {
				[Op.gte]: Date.now(),
			},
		},
	});

	if (!user) {
		req.flash('error', 'Invalid');
		res.redirect('/restore-password');
	}

	user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	user.token = null;
	user.expiration = null;

	await user.save();

	req.flash('success', 'You password has been changed');
	res.redirect('/login');
};
