const router = require('express').Router(),
	passport = require('passport'),
	jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
	res.redirect('/');
});

router.get(
	'/steam/return',
	passport.authenticate('steam', { session: false, failureRedirect: '/' }),
	generateUserToken
);

router.get(
	'/secure',
	// This request must be authenticated using a JWT, or else we will fail
	passport.authenticate([ 'jwt' ], { session: false }),
	(req, res) => {
		console.log('User is authenticated');
		console.log(req);
		res.send('Secure response from ' + JSON.stringify(req.user));
	}
);

module.exports = router;

function generateUserToken(req, res, test) {
	const accessToken = generateAccessToken(req.user.id);
	console.log('Generated token');
	res.render('authenticated', {
		token: accessToken,
		applicationUrl: process.env.APPLICATION_URL || 'http://localhost:8080/'
	});
}

// Generate an Access Token for the given User ID
function generateAccessToken(userId) {
	const expiresIn = '1 hour';
	const secret = process.env.JWT_SECRET;

	const token = jwt.sign({ id: userId.toString() }, secret, { expiresIn: expiresIn });
	return token;
}
