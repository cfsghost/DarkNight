var settings = require('./config');
var mongoose = require('mongoose');
var Member = require('../models/member');

module.exports = {
	create: function(member) {
		var member = new Member({
			name: member.name,
			email: member.email,
			gender: member.gender,
			cardno: member.cardno,
			tokens: member.tokens
		});

		return function(done) {
			member.save(done);
		};
	},
	save: function(id, member) {

		return function(done) {
			Member.update({ _id: id }, {
				name: member.name,
				email: member.email,
				gender: member.gender,
				cardno: member.cardno
			}, done);
		};
	},
	list: function() {

		return function(done) {
			Member.find(done);
		};
	}
};
