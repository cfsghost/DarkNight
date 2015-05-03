var Fluxer = require('fluxerjs');

var MemberActions = Fluxer.createActions('Member', [
	'GetInfo',
	'New',
	'Manage',
	'Blur',
	'Open',
	'Fetch',
	'Updated',
	'FetchAwards',
	'AddAwards'
]);

module.exports = MemberActions;
