
var Router = require('koa-router');
var Member = require('../../libs/member');

var router = module.exports = new Router();

router.get('/ranking', function *() {

	var page = parseInt(this.request.query.page) || 1;
	var perPage = parseInt(this.request.query.perpage) || 100;

	var data = yield Member.list([
		'name', 'cardno', 'points'
	] , {
		skip: (page - 1) * perPage,
		limit: perPage,
		sort: { points: 1 }
	});

	this.jsonp = this.body = {
		page: page,
		perPage: perPage,
		pageCount: Math.ceil(data.count / perPage),
		members: data.members
	}
});

router.get('/members', function *() {

	var page = parseInt(this.request.query.page) || 1;
	var perPage = parseInt(this.request.query.perpage) || 100;

	var data = yield Member.list({
		skip: (page - 1) * perPage,
		limit: perPage
	});

	this.jsonp = this.body = {
		page: page,
		perPage: perPage,
		pageCount: Math.ceil(data.count / perPage),
		members: data.members
	}
});

router.post('/members', function *() {

	var name = this.request.body.name;
	var email = this.request.body.email;
	var gender = this.request.body.gender;
	var idno = this.request.body.idno;
	var birthday = this.request.body.birthday;
	var cardno = this.request.body.cardno;
	var token = this.request.body.token;

	var memberData = {
		name: name,
		email: email,
		gender: gender,
		idno: idno,
		birthday: birthday,
		cardno: cardno,
		tokens: [
			token
		]
	};

	this.body = yield Member.create(memberData);
});

router.put('/member/:id', function *() {

	var memberId = this.params.id;

	var name = this.request.body.name;
	var email = this.request.body.email;
	var gender = this.request.body.gender;
	var idno = this.request.body.idno;
	var birthday = this.request.body.birthday;
	var cardno = this.request.body.cardno;
	var token = this.request.body.token;

	var memberData = {
		name: name,
		email: email,
		gender: gender,
		idno: idno,
		birthday: birthday,
		cardno: cardno,
		tokens: [
			token
		]
	};

	this.body = yield Member.save(memberId, memberData);
});

router.get('/member/:id/awards', function *() {

	var memberId = this.params.id || null;

	try {
		this.body = yield Member.getAwards(memberId);
	} catch(e) {
		this.status = 404;
		this.body = 'Not Found';
	}
});

router.post('/member/:id/awards', function *() {

	var memberId = this.params.id || null;
	var awards = this.request.body.awards || [];

	try {
		var results = [];
		for (var index in awards) {
			var award = awards[index];

			var result = yield Member.addAward(memberId, award);
			if (!result)
				continue;

			results.push(result);
		}
	} catch(e) {
		this.status = 404;
		this.body = 'Not Found';
		return;
	}

	this.body = results;
});
