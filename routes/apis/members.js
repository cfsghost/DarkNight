
var Router = require('koa-router');

var router = module.exports = new Router();

router.get('/members', function *() {
	this.body = 'DONE';
});

router.post('/members', function *() {

	var name = this.request.body.name;
	var email = this.request.body.email;
	var gender = this.request.body.gender;
	var tokens = this.request.body.tokens;

	console.log(name, email, gender, tokens);

	this.body = 'DONE';
});

router.get('/member/:id', function *() {

	var memberId = this.params.id || null;

	console.log(memberId);

    this.body = 'done';
});
