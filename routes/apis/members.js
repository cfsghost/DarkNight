
var Router = require('koa-router');
var Member = require('../../libs/member');

var router = module.exports = new Router();

router.get('/members', function *() {

	this.body = yield Member.list();
});

router.post('/members', function *() {

	var name = this.request.body.name;
	var email = this.request.body.email;
	var gender = this.request.body.gender;
	var cardno = this.request.body.cardno;
	var token = this.request.body.token;

	var memberData = {
		name: name,
		email: email,
		gender: gender,
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
	var cardno = this.request.body.cardno;
	var token = this.request.body.token;

	var memberData = {
		name: name,
		email: email,
		gender: gender,
		cardno: cardno,
		tokens: [
			token
		]
	};

	this.body = yield Member.save(memberId, memberData);
});

router.get('/members', function *() {
	this.body = 'DONE';
});

router.get('/member/:id', function *() {

	var memberId = this.params.id || null;

	console.log(memberId);

    this.body = 'done';
});
