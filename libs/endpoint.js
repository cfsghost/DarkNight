var settings = require('./config');
var mongoose = require('mongoose');
var Endpoint = require('../models/endpoint');

module.exports = {
	create: function(name) {
		var endpoint = new Endpoint({ name: name });

		return function(done) {
			endpoint.save(function(err) {
				done(err, endpoint);
			});
		};
	},
	save: function(id, endpoint) {

		return function(done) {
			Endpoint.update({ _id: id }, {
				name: endpoint.name
			}, done);
		};
	},
	list: function() {

		return function(done) {
			Endpoint.find(done);
		};
	}
};
