var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
	/*
	router.kkdb.find({}, function(err, docs){
		if (err) throw err;

		res.render('admin', {users: docs});
	});*/
});

/* POST registration */
router.post('/', function(req, res, next) {

});

module.exports = router;
