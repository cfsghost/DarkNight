var mongoose = require('mongoose');

var Award = new mongoose.Schema({
	name: String,
	desc: String,
	points: Number,
	icon: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Award', Award);
