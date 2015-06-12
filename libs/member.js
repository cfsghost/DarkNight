var crypto = require('crypto');
var settings = require('./config');
var mongoose = require('mongoose');
var Member = require('../models/member');
var MemberAward = require('../models/member-award');

function encryptPassword(salt, password) {
	return crypto.createHmac('sha256', password + salt || '').digest('hex');
}

module.exports = {
	create: function(member) {
		return function(done) {
			var _member = new Member({
				name: member.name,
				email: member.email,
				phone: member.phone,
				gender: member.gender,
				idno: member.idno,
				salt: crypto.randomBytes(12).toString('base64'),
				birthday: member.birthday,
				cardno: member.cardno,
				tokens: member.tokens
			});

			// Encrypt plain password
			_member.password = crypto.createHmac('sha256', member.password + _member.salt || '').digest('hex');

			member.save(function(err) {
				done(err, _member);
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
	changePassword: function(id, password) {
		return function(done) {

			// Generate a new salt for encryption
			var salt = crypto.randomBytes(12).toString('base64');
			Member.update({ _id: id }, {
				salt: salt,
				password: crypto.createHmac('sha256', password + salt || '').digest('hex')
			}, done);
		};
	},
	checkCard: function(token) {
		return function(done) {

			Member.findOne({ tokens: token }, function(err, member) {
				if (err)
					return done(err);

				return done(null, member);
			});
		};
	},
	authorizeMember: function(username, password) {
		return function(done) {

			Member.findOne({ email: username }, function(err, member) {
				if (err)
					return done(err);

				// First time to login
				if (!member.password) {
					if (member.phone == password)
						return done(null, member);
					else
						return done(null, null);
				}

				// Check password
				if (encryptPassword(member.salt, password) == member.password)
					return done(null, member);
				else
					return done(null, null);
			});
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
				tokens: [ token ],
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
