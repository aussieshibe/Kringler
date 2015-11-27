var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', {state: 'blank'});
});

/* POST registration */
router.post('/', function(req, res, next) {

	/*
	router.kkdb.find({name: req.body.userName}, function(err, docs){
		if (err) throw err;

		if(docs.length == 0){
			//not already registered, add to db
			router.kkdb.insert({name: req.body.userName}, function(err){
				if(err) throw err;

				res.render('register', {state: 'success', name: req.body.userName});
			});
		} else {
			res.render('register', {state: 'duplicateName'});

		}
	});*/
});

module.exports = router;
