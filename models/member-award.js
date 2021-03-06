var mongoose = require('mongoose');

var MemberAward = new mongoose.Schema({
	member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
	award: { type: mongoose.Schema.Types.ObjectId, ref: 'Award' },
	count: { type: Number, default: 1 },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MemberAward', MemberAward);
