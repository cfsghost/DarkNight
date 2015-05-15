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
	list: function() {

		var conditions = {};
		var columns;
		var opts;
		if (arguments.length == 2) {
			if (arguments[0] instanceof Array) {
				columns = arguments[0];
				opts = arguments[1];
			} else {
				conditions = arguments[0];
				opts = arguments[1];
			}
		} else {
			columns = null;
			opts = arguments[0];
		}

		return function(done) {

			var cols = null;
			if (columns)
				cols = columns.join(' ');

			Member.count(conditions, function(err, count) {

				Member.find(conditions, cols, opts, function(err, members) {

					done(err, {
						count: count,
						members: members
					});
				});
			});
		};
	},
	updateCardno: function(id, cardno) {

		return function(done) {
			Member.update({ _id: id }, {
				cardno: cardno,
				updated: Date.now()
			}, done);
		};
	},
	updateCardnoByEmail: function(email, token, cardno) {

		return function(done) {
			Member.update({ email: email }, {
				token: [ token ],
				cardno: cardno,
				updated: Date.now()
			}, done);
		};
	},
	getAwards: function(id) {

		return function(done) {

			MemberAward
				.find({ member: id })
				.populate('award')
				.exec(function(err, awards) {
					done(err, awards);
				});
		};
	},
	addAward: function(id, awardId) {

		return function(done) {

			MemberAward.update({ member: id, award: awardId }, { $inc: { count: 1 } }, { upsert: true }, function(err, awards) {

				MemberAward.findOne({ member: id, award: awardId })
					.populate('award')
					.exec(function(err, award) {
						done(err, award);
					});
			});
		};
	}
};
