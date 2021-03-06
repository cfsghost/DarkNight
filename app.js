"use strict";

var path = require('path');
var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var serve = require('koa-static');
var session = require('koa-session');
var passport = require('koa-passport');
var jsonp = require('koa-safe-jsonp');

var Database = require('./libs/database');
var Passport = require('./libs/passport');

var app = koa();

// Static file path
app.use(serve(__dirname + '/public'));

// Enabling BODY
app.use(bodyParser());

// Enable JSONP
jsonp(app);

// Loading settings
var settings = require('./libs/config.js');
if (!settings) {
	console.error('Failed to load settings');
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
app.use(session(app));

// Initializing passport
Passport.init(passport);
Passport.local(passport);
app.use(passport.initialize());
app.use(passport.session());

// Initializing locals to make template be able to get
app.use(function *(next) {
	this.state.user = this.req.user || undefined;
	yield next;
});

// Routes
app.use(require('./routes/home').middleware());
app.use(require('./routes/apis/endpoints').middleware());
app.use(require('./routes/apis/members').middleware());
app.use(require('./routes/apis/awards').middleware());
app.use(require('./routes/apis/uploads').middleware());
app.use(require('./routes/admin').middleware());

// Conenct to database
var dbTask = Database();
dbTask(function() {
	app.listen(3001, function() {
		console.log('server is ready');
	});
});
