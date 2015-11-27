var express = require('express');
var router = express.Router();

var Kringle = require('../models/kringle');
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	//if user is authenticated, call next
	//otherwise redirect to home page
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
};

exports = module.exports = function(passport){

	router.get('/', isAuthenticated, function(req, res){
		Kringle.find({ $or: [{'participants._id': req.user._id}, {'owner._id': req.user._id}]}, function(err, kringles){
			res.render('home', {'name': req.user.name, 'kringles': kringles});
		});
	});

	router.get('/kreate', isAuthenticated, function(req, res){
		res.render('kreate', {'name': req.user.name, 'kringles': []});
	});

	router.post('/kreate', isAuthenticated, function(req, res){
		User.findOne({'_id': req.user._id}, function(err, user){
			console.log("Creating Kringle: " + req.body.kringleName);
			console.log(user);
			
			var kringle = new Kringle();
			kringle.name = req.body.kringleName;
			kringle.password = req.body.kringlePassword;
			kringle.owner = { '_id': user._id, 'name': user.firstName };
			kringle.participants = [{name: user.firstName, _id: user._id}];
			kringle.save(function(err, done){
				if(err) throw err;
			});

			res.redirect('/home');
		});
	});

	return router;
}