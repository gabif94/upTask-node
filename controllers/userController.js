const Users = require('../models/Users');
const sendEmail = require('../handlers/email');

exports.createAccountForm = (req, res) => {
	res.render('createAccount', {
		pageName: 'Create Account on UpTask',
	});
};

exports.logInForm = (req, res) => {
	const {error} = res.locals.mesagges;

	res.render('logIn', {
		pageName: 'Login on UpTask',
		error,
	});
};

exports.createAccount = async (req, res, next) => {
	const {email, password} = req.body;

	try {
		await Users.create({
			email,
			password,
		});
		const confirmUrl = `http://${req.headers.host}/confirm/${email}`;

		const user = {
			email,
		};

		await sendEmail.send({
			user,
			subject: 'Confirm your UpTask account',
			confirmUrl,
			file: 'confirmAccount',
		});
		req.flash('success', 'We send an email, confirm your account');
		res.redirect('/login');
	} catch (error) {
		req.flash(
			'error',
			error.errors.map(error => error.message)
		);
		res.render('createAccount', {
			mesagges: req.flash(),
			pageName: 'Create Account on UpTask',
			email,
			password,
		});
	}
};

exports.resetPasswordForm = async (req, res) => {
	res.render('restore', {
		pageName: 'Restore your password',
	});
};

exports.confirmAccount = async (req, res) => {
	const user = await Users.findOne({where: {email: req.params.email}});

	if (!user) {
		req.flash('error', 'Invalid');
		res.redirect('/create-account');
	}

	user.active = 1;

	await user.save();

	req.flash('success', 'Account activate succesfull');
	res.redirect('/login');
};
