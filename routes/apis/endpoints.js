
var Router = require('koa-router');
var Endpoint = require('../../libs/endpoint');

var router = module.exports = new Router();

router.get('/endpoints', function *() {

	this.body = yield Endpoint.list();
});

router.post('/endpoints', function *() {

	console.log(this.request.body.name);

	this.body = 'DONE';
});

router.put('/endpoint/:id', function *() {

	var endpointId = this.params.id;

	var result = yield Endpoint.save(endpointId, this.request.body);

	this.body = result;
});

router.post('/endpoint/:id/emit/:event_name/:member_id', function *() {

	var endpointId = this.params.id;
	var eventName = this.params.event_name || null;
	var memberId = this.params.memberId || null;

	console.log(endpointId, eventName, memberId);

    this.body = 'done';
});
