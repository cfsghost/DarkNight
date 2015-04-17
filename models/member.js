var mongoose = require('mongoose');
var mongooseUUID = require('mongoose-uuid');

var Member = new mongoose.Schema({
	_id: false,
	name: String,
	email: String,
	gender: Number,
	cardno: Number,
	tokens: [ String ],
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

Member.plugin(mongooseUUID.plugin);

module.exports = mongoose.model('Member', Member);
