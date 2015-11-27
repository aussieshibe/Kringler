var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	//display login page + flash message
	res.render('index', {message: req.flash('message')});
});


/*
router.post('/login', passport.authenticate('login', {
	successRedirect: '/home',
	failureRedirect: '/',
	failureFlash: true
}));

router.get('/signup', function(req, res){
	res.render('register', {message: req.flash('message')});
});

router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.get('/home', isAuthenticated, function(req, res){
	res.render('home', {user: req.user});
});

router.get('/signout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/login/facebook',
	passport.authenticate('facebook', {scope: ['email'] }
));

router.get('/login/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/home',
		failureRedirect: '/'
	})
);*/

exports = module.exports = router;
