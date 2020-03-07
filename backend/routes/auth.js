const router = require('express').Router(),
	passport = require('passport'),
	jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
	res.redirect('/');
});

router.get(
	'/steam/return',
	// Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail

	passport.authenticate('steam', { session: false, failureRedirect: '/' }),
	generateUserToken
);

module.exports = router;

function generateUserToken(req, res) {
	const accessToken = generateAccessToken(req.user.id);
	console.log('Generated token');
	res.render('authenticated', {
		token: accessToken
	});
}

// Generate an Access Token for the given User ID
function generateAccessToken(userId) {
	const expiresIn = '1 hour';
	const secret = process.env.JWT_SECRET;

	const token = jwt.sign({}, secret, {
		expiresIn: expiresIn,
		subject: userId.toString()
	});

	return token;
}
