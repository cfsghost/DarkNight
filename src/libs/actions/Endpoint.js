var Fluxer = require('fluxerjs');

var EndpointActions = Fluxer.createActions('Endpoint', [ 'New', 'Manage', 'Blur', 'Open', 'Updated' ]);

module.exports = EndpointActions;
