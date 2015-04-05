var settings = require('./config');
var mongoose = require('mongoose');

module.exports = function() {

	return function(done) {

		mongoose.connect(settings.general.database.uri);
		var db = mongoose.connection;
		db.once('open', function() {
			done();
		});
	};
};
