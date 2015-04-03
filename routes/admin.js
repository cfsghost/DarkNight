
var Router = require('koa-router');

var router = module.exports = new Router();

router.get('/admin', function *() {
    yield this.render('admin');
});
