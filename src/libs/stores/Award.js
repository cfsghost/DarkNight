var Fluxer = require('fluxerjs');

var AwardStore = module.exports = Fluxer.createStore('Award');

var info = {
	pageCount: 1,
	perPage: 100,
	page: 1
};
var awards = {};

Fluxer.on('Award.New', function() {
	AwardStore.emit('OpenNewModal');
});

Fluxer.on('Award.Open', function(award) {
	AwardStore.emit('OpenEditModal', award);
});

Fluxer.on('Award.GetInfo', function() {
	AwardStore.emit('InfoUpdated', info);
});

Fluxer.on('Award.Fetch', function(page, perPage) {

	$.get('/awards?page=' + page + '&perpage=' + perPage, function(results) {

		info.page = results.page;
		info.perPage = results.perPage;
		info.pageCount = results.pageCount;

		// Refresh list
		awards = {};
		for (var index in results.awards) {
			var award = results.awards[index];
			awards[award._id] = award;
		}

		AwardStore.emit('Refresh', info, awards);
		AwardStore.emit('InfoUpdated', info);

	}.bind(this));
});

Fluxer.on('Award.Updated', function(awards) {

	for (var index in awards) {
		var award = awards[index];
		awards[award._id] = award;
	}

	AwardStore.emit('AwardsUpdated', awards);
});

Fluxer.on('Award.Manage', function() {
	AwardStore.emit('OpenManagement');
});

Fluxer.on('Award.Blur', function() {
	AwardStore.emit('CloseManagement');
});

Fluxer.on('Award.UpdateNewModal', function(status) {
	AwardStore.emit('UpdateNewModal', status);
});
