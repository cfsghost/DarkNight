var mongoose = require('mongoose');

var Endpoint = new mongoose.Schema({
	name: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Endpoint', Endpoint);
