
var Router = require('koa-router');

var router = module.exports = new Router();

router.get('/admin', function *(next) {
	// add authenticate function to avoid anyone access admin
    yield this.render('admin');
    if (this.isAuthenticated()) {
	    yield this.render('admin');
	} else {
		this.redirect('/')
	}
});
