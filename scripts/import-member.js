var uuid = require('node-uuid');
var Database = require('../libs/database');
var Member = require('../libs/member');

peopleList = require('/home/fred/下載/hackerz.db/tmp/people.json');

var members = [];
for (var index in peopleList) {
	var people = peopleList[index];
	members.push({
//		_id: uuid.v1(),
		name: people.name,
		phone: people.phone,
		email: people.email,
		cardno: people.cardId,
		tokens: [ people.cardToken ],
		created: new Date('2015-04-11'),
		updated: new Date('2015-04-11')
	});
}

// Conenct to database
var dbTask = Database();
dbTask(function() {

	// Create a new endpoint
	var task = Member.insert(members);
	task(function(err, result) {
		if (err) {
			console.log(err);
			return;
		}

		console.log(result);
	});
});
