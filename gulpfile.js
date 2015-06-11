var gulp = require('gulp-param')(require('gulp'), process.argv);
var less = require('gulp-less');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var path = require('path');
var fs = require('fs');

var paths = {
	less: './src/less/*.less',
	less_watch: './src/less/**/*.less',
	images: './src/img/*',
	fonts: './src/fonts/*',
	js: './src/js/**',
	views: [
		'./src/apps/*.jsx',
		'./src/libs/**/*.jsx',
		'./src/libs/**/*.js'
	],
	apps: [
		'./src/apps/*.jsx',
	]
};

gulp.task('less', function () {

	if (!paths.less.length)
		return;

	return gulp.src(paths.less)
		.pipe(less())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('images', function () {

	if (!paths.images.length)
		return;

	return gulp.src(paths.images)
		.pipe(gulp.dest('./public/img'));
});

gulp.task('js', function () {

	if (!paths.js.length)
		return;

	return gulp.src(paths.js)
		.pipe(gulp.dest('./public/js'));
});

gulp.task('views', [ 'apps' ], function () {
});

gulp.task('app', function (app) {

	if (!paths.apps.length)
		return;

	for (var index in paths.apps) {
		var pathname = path.dirname(paths.apps[index]);
		var appPath = pathname + '/' + app + '.jsx';

		if (fs.existsSync(appPath)) {
			return gulp.src(appPath, { read: false })
				.pipe(browserify({
					transform: [ 'reactify' ],
					extensions: [ '.jsx' ]
				}))
				.pipe(rename({ extname: '.js' }))
				.pipe(gulp.dest('./public/views'));
		}
	}
});

gulp.task('apps', function () {

	if (!paths.apps.length)
		return;

	return gulp.src(paths.apps, { read: false })
		.pipe(browserify({
			transform: [ 'reactify' ],
			extensions: [ '.jsx' ]
		}))
		.pipe(rename({ extname: '.js' }))
		.pipe(gulp.dest('./public/views'));
});

gulp.task('fonts', function () {

	if (!paths.fonts.length)
		return;

	return gulp.src(paths.fonts)
		.pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function() {
	gulp.watch(paths.less_watch, [ 'less' ]);
	gulp.watch(paths.images, [ 'images' ]);
	gulp.watch(paths.fonts, [ 'fonts' ]);
	gulp.watch(paths.js, [ 'js' ]);
	gulp.watch(paths.views, [ 'views' ]);
});

gulp.task('build', [ 'less', 'images', 'js', 'fonts', 'views' ]);
