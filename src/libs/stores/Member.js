var Fluxer = require('fluxerjs');

var MemberStore = module.exports = Fluxer.createStore('Member');

Fluxer.on('Member.New', function() {
	MemberStore.emit('OpenNewModal');
});

Fluxer.on('Member.Open', function(member) {
	MemberStore.emit('OpenEditModal', member);
});

Fluxer.on('Member.Updated', function(members) {
	MemberStore.emit('MembersUpdated', members);
});

Fluxer.on('Member.Manage', function() {
	MemberStore.emit('OpenManagement');
});

Fluxer.on('Member.Blur', function() {
	MemberStore.emit('CloseManagement');
});
