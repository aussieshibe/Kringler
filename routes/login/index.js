var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	//if user is authenticated, redirect to home
	//otherwise return next
	if(req.isAuthenticated())
		res.redirect('/home');

	return next();
};

exports = module.exports = function(passport){

	router.get('/', function(req, res) {
		res.render('login', {message: req.flash('message')});
	});

	//route for fb auth and login
	router.get('/facebook',
		passport.authenticate('facebook')
	);

	//handle callback after auth
	router.get('/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/home',
			failureRedirect: '/'
		})
	);

	return router;

};