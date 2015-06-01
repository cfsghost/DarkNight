
var Router = require('koa-router');
var passport = require('koa-passport');

var router = module.exports = new Router();

router.get('/', function *() {
    yield this.render('index');
});

router.post('/', function *() {
    this.body = 'done';
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