var gulp = require('gulp');
var inject = require('gulp-inject');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

gulp.task('default', ['inject'], () => {
  return $.nodemon({
		script: './index.js'
	}).on('start', function (cb) {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('inject', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./libs/*.js', './js/**/*.js'], {read: false});
	console.log('aaa');
  return target.pipe(inject(sources, {relative: false}))
    .pipe(gulp.dest('./'));
});
