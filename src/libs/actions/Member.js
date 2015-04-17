var Fluxer = require('fluxerjs');

var MemberActions = Fluxer.createActions('Member', [ 'New', 'Manage', 'Blur', 'Open', 'Updated' ]);

module.exports = MemberActions;
