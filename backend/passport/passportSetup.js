const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const User = require('../models/user.js');
require('dotenv').config();

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new SteamStrategy(
		{
			returnURL: process.env.APPLICATION_URL + '/auth/steam/return',
			realm: process.env.APPLICATION_URL,
			apiKey: process.env.STEAM_API_KEY
		},
		function(identifier, profile, done) {
			// asynchronous verification
			process.nextTick(function() {
				User.findOne({ steamId: profile.id }).then((currentUser) => {
					if (currentUser) {
						// user already exists
						done(null, currentUser);
					} else {
						// user is new, create new user document
						new User({
							steamId: profile.id,
							username: profile.displayName,
							image: profile.photos[2].value
						})
							.save()
							.then((newUser) => {
								console.log('created new user: ', newUser);
								done(null, newUser);
							});
					}
				});
			});
		}
	)
);
