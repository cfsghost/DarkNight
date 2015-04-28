
var Router = require('koa-router');

var router = module.exports = new Router();

router.post('/uploads', function *() {
	this.body = 'DONE';
});
