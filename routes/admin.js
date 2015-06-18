
var Router = require('koa-router');

var router = module.exports = new Router();

router.use('/admin', function *(next) {
	if (this.isAuthenticated()) {
		yield next
	} else {
		this.redirect('/login');
	}
});

router.get('/admin', function *(next) {
	yield this.render('admin');
});
