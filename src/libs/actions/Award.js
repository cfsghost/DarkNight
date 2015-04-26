var Fluxer = require('fluxerjs');

var AwardActions = Fluxer.createActions('Award', [ 'GetInfo', 'New', 'Manage', 'Blur', 'Open', 'Fetch', 'Updated' ]);

module.exports = AwardActions;
