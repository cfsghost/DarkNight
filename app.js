"use strict";

var path = require('path');
var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var serve = require('koa-static');
var session = require('koa-session');

var app = koa();

// Static file path
app.use(serve(__dirname + '/public'));

// Enabling BODY
app.use(bodyParser());

// Loading settings
try {

	var settings = {
		general: require(path.join(__dirname, 'configs', 'general.json'))
	};
} catch(e) {
	console.error('Failed to load settings');
	console.error(e);
	process.exit(1);
}

// Create render
app.use(views(__dirname + '/views', {
	ext: 'jade',
	map: {
		html: 'jade'
	}
}));

// Initializing session mechanism
app.keys = settings.general.session.keys || [];
app.use(session());

// Routes
app.use(require('./routes/home').middleware());
app.use(require('./routes/admin').middleware());
app.use(require('./routes/apis/endpoints').middleware());
app.use(require('./routes/apis/members').middleware());

app.listen(3000);
