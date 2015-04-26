var settings = require('./config');
var mongoose = require('mongoose');
var Award = require('../models/award');

module.exports = {
	create: function(award) {
		var award = new Award({
			name: award.name,
			points: award.points
		});

		return function(done) {
			award.save(function(err) {
				done(err, award);
			});
		};
	},
	save: function(id, award) {

		return function(done) {
			Award.update({ _id: id }, {
				name: award.name,
				points: award.points,
				updated: Date.now()
			}, done);
		};
	},
	list: function(opts) {

		return function(done) {

			Award.count({}, function(err, count) {

				Award.find({}, {}, opts, function(err, awards) {

					done(err, {
						count: count,
						awards: awards
					});
				});
			});
		};
	}
};
