// npm install --save-dev gulp-

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	compass = require('gulp-compass'),	
	connect = require('gulp-connect'),	
	browserify = require('gulp-browserify'), // Browserify lets you require('modules') in the browser by bundling up all of your dependencies.											
	concat = require('gulp-concat');		 // Like importing jQuery, mustache

// gulp.task('log', function() {
// 	gutil.log('My first gulp workflow');
// });

var coffeeSources = ['./builds/components/coffee/tagline.coffee'];
var jsSources = [
	'./builds/components/scripts/rclick.js',
	'./builds/components/scripts/pixgrid.js',
	'./builds/components/scripts/tagline.js',
	'./builds/components/scripts/template.js'
];
var sassSources = ['./builds/components/sass/style.scss'];
var htmlSources = ['./builds/development/*.html'];
var jsonSources = ['./builds/development/js/*.json'];


gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({ bare: true })
			.on('error', gutil.log))
		.pipe(gulp.dest('./builds/components/scripts'))
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('./builds/development/js'))
		.pipe(connect.reload())
});

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: './builds/components/sass',
			css: './builds/development/css',
			image: './builds/development/images',
			style: 'expanded',
			comments: true
		}))
		.on('error', function(error) {
			console.log(error);
			this.emit('end');
		})
		.pipe(gulp.dest('./builds/development/css'))
		.pipe(connect.reload())
})

// gulp.task('all', ['coffee', 'js', 'compass']);

gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']); // ['coffee'] is the task function
	gulp.watch(jsSources, ['js']);
	gulp.watch('./builds/components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
	connect.server({
		root: './builds/development',
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

gulp.task('json', function() {
	gulp.src(jsonSources)
	.pipe(connect.reload())
});


gulp.task('default', ['html', 'coffee', 'js', 'compass', 'json', 'connect', 'watch']);
