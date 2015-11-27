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

var isAdmin = function(user, kringle){
	if(kringle.owner._id == user._id){
		return true;
	} else {
		return false;
	}
}

var isParticipant = function(user, kringle){
	for(var i = 0; i < kringle.participants.length; i++){
		if(user._id == kringle.participants[i]._id){
			return true;
		}
	}
	return false;
}

exports = module.exports = function(){

	router.get('/:id/', isAuthenticated, function(req, res){
		Kringle.findOne({_id: req.params.id}, function(err, kringle){

			if(err) return err;

			for(var i = 0; i < kringle.participants.length; i++){

				console.log(kringle.participants[i].match);
				if(kringle.participants[i]._id != req.user._id){
					if(kringle.participants[i].match._id == undefined){
						kringle.participants[i].match = {'name': 'Not Matched'};
					} else {
						console.log(kringle.participants[i].match._id);
						kringle.participants[i].match = {'name': 'Matched'};
					}
				}
			}

			if(err) 
				res.redirect('/home');



			res.render('kringle', {'isAdmin': isAdmin(req.user, kringle), 'isParticipant': isParticipant(req.user, kringle), 'kringle': kringle});
		});
	});

	router.post('/:id/match', isAuthenticated, function(req, res){
		Kringle.findOne({_id: req.params.id}, function(err, kringle){

			if(err) return err;

			//check that the current user is allowed to do this
			if(kringle.owner._id == req.user._id){

				var newParticipants = [];

				console.log(kringle.participants);

				while(kringle.participants.length > 0){

					newParticipants.push(kringle.participants.splice(Math.floor(Math.random() * kringle.participants.length), 1)[0]);
				}

				kringle.participants = newParticipants;

				for(var i = 0; i < kringle.participants.length - 1; i++){
					kringle.participants[i].match = kringle.participants[i+1];
				}

				console.log(kringle.participants);
				kringle.participants[kringle.participants.length - 1].match = kringle.participants[0];

				kringle.save();

				res.redirect('/kringle/' + req.params.id);
			} else {
				res.redirect('/');
			}
		});
	});

	router.post('/:id/join', isAuthenticated, function(req, res){
		Kringle.findOne({_id: req.params.id}, function(err, kringle){

			if (err) throw err;

			User.findOne({_id: req.user._id}, function(err, user){

				if(err) throw err;

				kringle.participants.push({'_id': user._id, 'name': user.firstName});

				kringle.save(function (err){
					if(err) throw err;
					res.redirect('/kringle/' + req.params.id);
				});

				
			});
		});
	});

	return router;
};