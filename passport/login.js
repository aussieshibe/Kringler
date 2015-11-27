passport.use('login', new LocalStrategy({
	passReqToCallback: true
	},

	function(req, username, password, done) {

		//check if user exists
		User.findOne({'username': username }, 
			function(err, user) {

				if(err)
					return done(err);

				if(!user){
					console.log('User not found with username ' + username);
					return done(null, false, req.flash('message', 'User Not Found'));
				}

				//user exists but wrong pwd
				if (!isValidPassword(user, password)){
					console.log('Invalid Password');
					return done(null, false,
						req.flash('message', 'Invalid Password'))
				}

				//username and password match
				return done(null, user);
			}
		);
	})
);