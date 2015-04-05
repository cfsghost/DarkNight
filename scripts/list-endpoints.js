
var Database = require('../libs/database');
var Endpoint = require('../libs/endpoint');

// Conenct to database
var dbTask = Database();
dbTask(function() {

	// Create a new endpoint
	var task = Endpoint.list();
	task(function(err, result) {
		if (err) {
			console.log(err);
			return;
		}

		console.log(result);
	});
});
