const passport = require('passport');

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
