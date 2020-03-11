const passport = require('passport');
const passportJwt = require('passport-jwt');
const User = require('../models/user.js');
require('dotenv').config();

const jwtOptions = {
	// Get the JWT from the "Authorization" header.
	// By default this looks for a "JWT " prefix
	jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	// The secret that was used to sign the JWT
	secretOrKey: process.env.JWT_SECRET
};

passport.use(
	new passportJwt.Strategy(jwtOptions, (payload, done) => {
		console.log(payload.id);
		User.findById(payload.id, (err, user) => {
			if (user) {
				return done(null, user, payload);
			}
			return done();
		});
	})
);
