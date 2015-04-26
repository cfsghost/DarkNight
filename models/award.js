var mongoose = require('mongoose');

var Award = new mongoose.Schema({
	name: String,
	points: Number,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Award', Award);
