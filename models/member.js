var mongoose = require('mongoose');

var Member = new mongoose.Schema({
	name: String,
	gender: Number,
	birthday: Date,
	email: String,
	phone: String,
	idno: String,
	cardno: Number,
	tokens: [ String ],
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', Member);
