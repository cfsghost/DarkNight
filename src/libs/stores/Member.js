var Fluxer = require('fluxerjs');

var MemberStore = module.exports = Fluxer.createStore('Member');

var info = {
	pageCount: 1,
	perPage: 100,
	page: 1
};
var members = {};

Fluxer.on('Member.New', function() {
	MemberStore.emit('OpenNewModal');
});

Fluxer.on('Member.Open', function(member) {
	MemberStore.emit('OpenEditModal', member);
});

Fluxer.on('Member.GetInfo', function() {
	MemberStore.emit('InfoUpdated', info);
});

Fluxer.on('Member.Fetch', function(page, perPage, queries) {

	$.get('/members?page=' + page + '&perpage=' + perPage + ((Object.keys(queries).length) ? '&q=' + JSON.stringify(queries) : '') , function(results) {

		info.page = results.page;
		info.perPage = results.perPage;
		info.pageCount = results.pageCount;
		info.queries = queries;

		// Refresh list
		members = {};
		for (var index in results.members) {
			var member = results.members[index];
			member.created = member.created.split('T')[0];
			members[member._id] = member;
		}

		MemberStore.emit('Refresh', info, members);
		MemberStore.emit('InfoUpdated', info);

	}.bind(this));
});

Fluxer.on('Member.Updated', function(members) {

	for (var index in members) {
		var member = members[index];
		members[member._id] = member;
	}

	MemberStore.emit('MembersUpdated', members);
});

Fluxer.on('Member.Manage', function() {
	MemberStore.emit('OpenManagement');
});

Fluxer.on('Member.Blur', function() {
	MemberStore.emit('CloseManagement');
});

Fluxer.on('Member.FetchAwards', function(memberId) {

	$.get('/member/' + memberId + '/awards', function(results) {
		MemberStore.emit('AwardsUpdated', results);
	});
});

Fluxer.on('Member.AddAwards', function(memberId, awards) {

	$.ajax({
		type: 'post',
		url: '/member/' + memberId + '/awards',
		processData: false,
		contentType: 'application/json',
		data: JSON.stringify({
			awards: awards
		}),
		success: function(r) {
			console.log(r);
			MemberStore.emit('AwardsUpdated', r);
		}
	});
});
