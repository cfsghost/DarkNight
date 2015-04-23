var async = require('async');
var uuid = require('node-uuid');
var Database = require('../libs/database');
var Member = require('../libs/member');

//peopleList = require('/home/fred/下載/csv/6-min.json');
//peopleList = require('/home/fred/下載/csv/5-min.json');
peopleList = require('/home/fred/下載/csv/4-min.json');

// Conenct to database
var dbTask = Database();
dbTask(function() {

	async.eachSeries(peopleList, function(member, next) {

		if (member.idno)
			member.gender = (member.idno.substr(1, 1) == '1') ? 0 : 1;
		else
			member.gender = 0;

//		console.log(member);
		var task = Member.updateByEmail(member.email, member, { upsert: true });
		task(function(err, result) {
			if (err) {
				console.log(err);
				return;
			}
			console.log(result);
			next();
		});
	}, function() {
		console.log('DONE');
	});
});
