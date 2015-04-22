var Fluxer = require('fluxerjs');

var MemberActions = Fluxer.createActions('Member', [ 'GetInfo', 'New', 'Manage', 'Blur', 'Open', 'Fetch', 'Updated' ]);

module.exports = MemberActions;
