
var Router = require('koa-router');
var Member = require('../../libs/member');

var router = module.exports = new Router();

router.get('/members', function *() {

	var page = parseInt(this.request.query.page) || 1;
	var perPage = parseInt(this.request.query.perpage) || 100;

	var data = yield Member.list({
		skip: (page - 1) * perPage,
		limit: perPage
	});

	this.body = {
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

router.get('/member/:id', function *() {

	var memberId = this.params.id || null;

	console.log(memberId);

    this.body = 'done';
});
