var Fluxer = require('fluxerjs');

var EndpointStore = module.exports = Fluxer.createStore('Endpoint');

Fluxer.on('Endpoint.New', function() {
	console.log(11111);
	EndpointStore.emit('OpenNewModal');
});

