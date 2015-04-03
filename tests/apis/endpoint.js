var request = require('request');

request.post({
	url: 'http://localhost:3000/endpoints',
	json: true,
	body: {
		name: 'Hackathon Taiwan Entry'
	}
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});


