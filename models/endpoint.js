var mongoose = require('mongoose');
var mongooseUUID = require('mongoose-uuid');

var Endpoint = new mongoose.Schema({
	_id: false,
	name: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

Endpoint.plugin(mongooseUUID.plugin);

module.exports = mongoose.model('Endpoint', Endpoint);
