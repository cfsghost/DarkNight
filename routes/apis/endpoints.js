
var Router = require('koa-router');

var router = module.exports = new Router();

router.post('/endpoints', function *() {

	console.log(this.request.body.name);

	this.body = 'DONE';
});

router.post('/endpoint/:id/emit/:event_name/:member_id', function *() {

	var endpointId = this.params.id;
	var eventName = this.params.event_name || null;
	var memberId = this.params.memberId || null;

	console.log(endpointId, eventName, memberId);

    this.body = 'done';
});
