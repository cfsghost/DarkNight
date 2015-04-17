var Fluxer = require('fluxerjs');

var EndpointStore = module.exports = Fluxer.createStore('Endpoint');

Fluxer.on('Endpoint.New', function() {
	EndpointStore.emit('OpenNewModal');
});

Fluxer.on('Endpoint.Open', function(endpoint) {
	EndpointStore.emit('OpenEditModal', endpoint);
});

Fluxer.on('Endpoint.Updated', function(endpoints) {
	EndpointStore.emit('EndpointsUpdated', endpoints);
});

Fluxer.on('Endpoint.Manage', function() {
	EndpointStore.emit('OpenManagement');
});

Fluxer.on('Endpoint.Blur', function() {
	EndpointStore.emit('CloseManagement');
});
