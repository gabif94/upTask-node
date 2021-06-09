const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/Users');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await Users.findOne({where: {email, active: 1}});

				if (!user.verifyPassword(password)) {
					return done(null, false, {
						message: 'Password incorrect',
					});
				}
				return done(null, user);
			} catch (error) {
				return done(null, false, {
					message: 'That account does not exist',
				});
			}
		}
	)
);

passport.serializeUser((user, callback) => {
	callback(null, user);
});

passport.deserializeUser((user, callback) => {
	callback(null, user);
});

module.exports = passport;
