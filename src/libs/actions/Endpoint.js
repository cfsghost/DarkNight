var Fluxer = require('fluxerjs');

var EndpointActions = Fluxer.createActions('Endpoint', [ 'New', 'Manage', 'Open', 'Updated' ]);

module.exports = EndpointActions;
