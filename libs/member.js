var settings = require('./config');
var mongoose = require('mongoose');
var Member = require('../models/member');
var MemberAward = require('../models/member-award');

module.exports = {
	create: function(member) {
		var member = new Member({
			name: member.name,
			email: member.email,
			phone: member.phone,
			gender: member.gender,
			idno: member.idno,
			birthday: member.birthday,
			cardno: member.cardno,
			tokens: member.tokens
		});

		return function(done) {
			member.save(function(err) {
				done(err, member);
			});
		};
	},
	insert: function(members) {
		return function(done) {

			Member.collection.insert(members, done);
		};
	},
	updateByEmail: function(email, member, opts) {
		
		return function(done) {

			// Update time
			member.updated = Date.now();

			Member.update({ email: email }, member, opts, done);
		};
	},
	save: function(id, member) {

		return function(done) {
			Member.update({ _id: id }, {
				name: member.name,
				email: member.email,
				phone: member.phone,
				gender: member.gender,
				idno: member.idno,
				birthday: member.birthday,
				cardno: member.cardno,
				tokens: member.tokens,
				updated: Date.now()
			}, done);
		};
	},
	list: function(opts) {

		return function(done) {

			Member.count({}, function(err, count) {

				Member.find({}, {}, opts, function(err, members) {

					done(err, {
						count: count,
						members: members
					});
				});
			});
		};
	},
	getAwards: function(id) {

		return function(done) {

			MemberAward.find({ member: id }, function(err, awards) {
				done(err, awards);
			});
		};
	}
};
