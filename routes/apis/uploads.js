var fs = require('fs');
var os = require('os');
var path = require('path');
var parse = require('co-busboy');
var Router = require('koa-router');

var router = module.exports = new Router();

router.post('/uploads', function *() {

	if (!this.request.is('multipart/*'))
		return yield next;

	var parts = parse(this);
	var part;

	while(part = yield parts) {
		var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
		part.pipe(stream);
		console.log('uploading %s -> %s', part.filename, stream.path);
	}

	this.body = 'DONE';
});
