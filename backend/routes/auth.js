const router = require('express').Router(),
	passport = require('passport');

router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
	res.redirect('/');
});

router.get(
	'/steam/return',
	// Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
	function(req, res, next) {
		req.url = req.originalUrl;
		next();
	},
	passport.authenticate('steam', { failureRedirect: '/' }),
	function(req, res) {
		res.send('Autehnticated');
	}
);

module.exports = router;
