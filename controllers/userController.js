const Users = require('../models/Users');

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
