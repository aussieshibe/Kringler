var express = require('express');
var router = express.Router();

var Kringle = require('../models/kringle');

var isAuthenticated = function (req, res, next) {
	//if user is authenticated, call next
	//otherwise redirect to home page
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
};

exports = module.exports = function(){

	router.get('/:id/', isAuthenticated, function(req, res){
		Kringle.findOne({_id: req.params.id}, function(err, kringle){

			if(err) 
				res.redirect('/home');

			res.render('kringle', {'kringle': kringle});
		});
	});

	return router;
};