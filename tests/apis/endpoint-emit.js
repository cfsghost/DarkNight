var request = require('request');

request.post({
	url: 'http://localhost:3000/endpoint/00000/emit/login/testmember',
	json: true,
	body: {
		payload: 'Hello'
	}
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});


