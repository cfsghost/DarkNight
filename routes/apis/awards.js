
var Router = require('koa-router');
var Award = require('../../libs/award');

var router = module.exports = new Router();

router.get('/awards', function *() {

	var page = parseInt(this.request.query.page) || 1;
	var perPage = parseInt(this.request.query.perpage) || 100;

	var data = yield Award.list({
		skip: (page - 1) * perPage,
		limit: perPage
	});

	this.body = {
		page: page,
		perPage: perPage,
		pageCount: Math.ceil(data.count / perPage),
		awards: data.awards
	}
});

router.post('/awards', function *() {

	var name = this.request.body.name;
	var points = this.request.body.points;

	var awardData = {
		name: name,
		points: points,
	};

	this.body = yield Award.create(awardData);
});

router.put('/award/:id', function *() {

	var awardId = this.params.id;

	var name = this.request.body.name;
	var points = this.request.body.points;

	var awardData = {
		name: name,
		points: points,
	};

	this.body = yield Award.save(awardId, awardData);
});
