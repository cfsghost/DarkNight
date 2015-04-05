
var Database = require('../libs/database');
var Endpoint = require('../libs/endpoint');

var name = process.argv[2] || null;

if (!name)
	process.exit(1);

// Conenct to database
var dbTask = Database();
dbTask(function() {

	// Create a new endpoint
	var task = Endpoint.create(name);
	task(function(err, result) {
		if (err) {
			console.log(err);
			return;
		}

		console.log(result);
	});
});
