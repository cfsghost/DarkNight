var mongoose = require('mongoose');

var Admin = new mongoose.Schema({
	member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', Admin);
