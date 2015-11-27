var mongoose = require('mongoose');

module.exports = mongoose.model('Kringle',{
	name: 'String',
	owner: {
		_id: 'String',
		name: 'String'
	},
	participants: [{
		_id: 'String',
		name: 'String'
	}],
});