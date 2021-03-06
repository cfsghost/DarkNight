
var Router = require('koa-router');
var passport = require('koa-passport');
var Member = require('../libs/member');

var router = module.exports = new Router();

router.get('/', function *() {
    yield this.render('index');
});

router.get('/logout', function *() {
	this.logout();
	this.redirect('/');
});

router.get('/login', function *() {
	yield this.render('login');
});

router.post('/login', function *(next) {
	var self = this;
	var targetUrl = this.query.target || '/';

	yield passport.authenticate('local', function *(err, user, info) {
		if (!user) {
			self.redirect('/login?err=1&target=' + targetUrl);
			return;
		}

		// Store login information in session
		yield self.login(user);
		self.redirect(targetUrl);
	}).call(this, next);
});

router.get('/login/Local', function * () {
	yield this.render('loginlocal');
});

router.post('/login/Local', passport.authenticate('local-login', {
    successRedirect: '/admin',
    failureRedirect: '/login/Local'
}));
router.get('/signup/Local', function * () {
	yield this.render('signuplocal');
});
router.post('/signup/Local', passport.authenticate('local-signup', {
    successRedirect : '/admin',
    failureRedirect : '/signup/Local'
}));

router.get('/login/ID', function * () {
	yield this.render('loginid');
});
router.get('/signup/ID', function * () {
	yield this.render('signupid');
});
