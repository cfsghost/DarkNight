
var Router = require('koa-router');

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
router.get('/login/ID', function * () {
	yield this.render('loginid');
});

router.get('/signup/Local', function * () {
	yield this.render('signuplocal');
});
router.get('/signup/ID', function * () {
	yield this.render('signupid');
});