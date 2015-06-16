
var Router = require('koa-router');
var Member = require('../../libs/member');
var opencardList = require('../../opencard.json');

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
	var q = {};
	try {
		q = JSON.parse(this.request.query.q);
	} catch(e) {}

	var conditions = {};
	if (q.name) {
		conditions.name = new RegExp(q.name, 'i');
	}
	if (q.email) {
		conditions.email = new RegExp(q.email, 'i');
	}
	if (q.phone) {
		conditions.phone = new RegExp(q.phone, 'i');
	}
	if (q.cardno) {
		conditions.cardno = q.cardno;
	}
	if (q.idno) {
		conditions.idno = q.idno;
	}
	if (q.token) {
		conditions.tokens = new RegExp(q.token, 'i');
	}

	var data = yield Member.list(conditions, {
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

router.get('/card/:token', function *() {
	var token = this.params.token || null;

	try {
		this.body = yield Member.checkCard(token);
	} catch(e) {
		this.status = 404;
		this.body = 'Not Found';
	}
});

router.put('/member/:id', function *() {

	var memberId = this.params.id;

	var name = this.request.body.name;
	var email = this.request.body.email;
	var phone = this.request.body.phone;
	var gender = this.request.body.gender;
	var idno = this.request.body.idno;
	var birthday = this.request.body.birthday;
	var cardno = this.request.body.cardno;
	var token = this.request.body.token;

	var memberData = {
		name: name,
		email: email,
		phone: phone,
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

router.put('/member/:id/cardno', function *() {

	var memberId = this.params.id || null;
	var cardno = this.request.body.cardno;

	if (!this.params.id) {
		this.status = 404;
		this.body = 'Not Found'
		return;
	}

	this.body = yield Member.updateCardno(memberId, cardno);
});

router.get('/opencard/:regno/:cardno/:token', function *() {

	var regno = this.params.regno || null;
	var cardno = this.params.cardno;
	var token = this.params.token;

	for (var index in opencardList) {
		var item = opencardList[index];
		if (item.regno == regno) {
			this.body = item;
			break;
		}
	}

	this.body = yield Member.updateCardnoByEmail(item.email, token, cardno);
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

router.post('/opencard', function *() {

	var email = this.request.body.email;
	var token = this.request.body.token;
	var cardno = this.request.body.cardno;

	if (!email) {
		this.status = 404;
		this.body = 'Not Found'
		return;
	}

	this.body = yield Member.updateCardnoByEmail(email, token, cardno);
});
