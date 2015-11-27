var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var fbConfig = require('../config/fb.js');


module.exports = function(passport) {

	passport.use('facebook', new FacebookStrategy({
		clientID: fbConfig.appID,
		clientSecret: fbConfig.appSecret,
		callbackURL: fbConfig.callbackUrl,
		profileFields: ['id', 'name', 'emails']
	},

	//facebook will send back tokens + profile
	function(access_token, refresh_token, profile, done) {

		//async
		process.nextTick(function() {

			//find user in DB based on facebook ID
			User.findOne({ 'fb.id' : profile.id }, function(err, user) {

				//if err, return err
				if (err) return done(err);

				//if user found, log in
				if (user) {
					return done(null, user);
				} else {
					//if no user, create user
					var newUser = new User();

					//apply fb into to user model
					newUser.fb.id = profile.id;
					newUser.fb.access_token = access_token;
					newUser.fb.firstName = profile.name.givenName;
					newUser.fb.lastName = profile.name.familyName;
					newUser.fb.email = profile.emails[0].value;

					newUser.firstName = profile.name.givenName;
					newUser.email = profile.emails[0].value;

					//save user to db
					newUser.save(function(err) {
						if(err)
							throw err;

						//if successful return the new user
						return done(null, newUser);
					});
				}
			});
		});
	}));
};