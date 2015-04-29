var fs = require('fs');
var cofs = require('co-fs');
var path = require('path');
var parse = require('co-busboy');
var Router = require('koa-router');
var Router = require('koa-router');
var Award = require('../../libs/award');

var router = module.exports = new Router();

router.get('/awards', function *() {

	var page = parseInt(this.request.query.page) || 1;
	var perPage = parseInt(this.request.query.perpage) || 100;

	var data = yield Award.list({
		skip: (page - 1) * perPage,
		limit: perPage
	});

	this.body = {
		page: page,
		perPage: perPage,
		pageCount: Math.ceil(data.count / perPage),
		awards: data.awards
	}
});

router.post('/awards', function *() {

	var name = this.request.body.name;
	var desc = this.request.body.desc;
	var points = this.request.body.points;
	var icon = this.request.body.icon;

	var awardData = {
		name: name,
		desc: desc,
		points: points,
		icon: icon
	};

	this.body = yield Award.create(awardData);
});

router.put('/award/:id', function *() {

	var awardId = this.params.id;

	var name = this.request.body.name;
	var desc = this.request.body.desc;
	var points = this.request.body.points;

	var awardData = {
		name: name,
		desc: desc,
		points: points
	};

	this.body = yield Award.save(awardId, awardData);
});

router.post('/uploads/award', function *() {

	if (!this.request.is('multipart/*'))
		return yield next;

	var parts = parse(this);
	var part;

	// Getting target path to put icons
	var awardIconsDir = Award.getIconsDir();
	var Id = Award.getAvailableId();

	// Save one file only
	var part = yield parts;
	var filename = path.join(awardIconsDir, Id + path.extname(part.filename));
	var stream = fs.createWriteStream(filename);
	part.pipe(stream);
	console.log('uploading %s -> %s', part.filename, stream.path);

	this.body = {
		id: Id 
	};
});

router.get('/award/:id/icon', function *() {

	// Getting target path to put icons
	var awardIconsDir = Award.getIconsDir();
	var awardId = this.params.id;
	var filename = path.join(awardIconsDir, awardId);

	if (!awardId)
		return;
	console.log(filename);

	if (yield cofs.exists(filename + '.jpg')) {
		this.type = '.jpg';
		this.body = fs.createReadStream(filename + '.jpg');
	} else if (yield cofs.exists(filename + '.png')) {
		this.type = '.png';
		this.body = fs.createReadStream(filename + '.png');
	} else if (yield cofs.exists(filename + '.gif')) {
		this.type = '.gif';
		this.body = fs.createReadStream(filename + '.gif');
	} else {
		this.status = 404;
		this.body = 'Not Found';
	}
});

