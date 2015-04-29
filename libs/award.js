var uuid = require('node-uuid');
var mkdirp = require('mkdirp');
var settings = require('./config');
var mongoose = require('mongoose');
var Award = require('../models/award');

var awardIconsDir = settings.general.awardIconsDir || '/tmp';
if (awardIconsDir.search('./') == 0) {
	var path = require('path');

	awardIconsDir = path.join(__dirname, '..', awardIconsDir);
}

// Create a new directory if it doesn't exist
mkdirp.sync(awardIconsDir);

module.exports = {
	getIconsDir: function() {
		return awardIconsDir;
	},
	getAvailableId: function() {
		return uuid.v1();
	},
	create: function(award) {
		var award = new Award({
			name: award.name,
			desc: award.desc,
			points: award.points,
			icon: award.icon
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
				desc: award.desc,
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
