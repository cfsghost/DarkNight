var request = require('request');

request.post({
	url: 'http://localhost:3000/members',
	json: true,
	body: {
		name: 'Fred Chien',
		email: 'cfsghost@gmail.com',
		gender: 1,
		tokens: [
			'42e99994'
		]
	}
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});


