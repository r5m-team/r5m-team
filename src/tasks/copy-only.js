var gulp = require('gulp');
var shell = require('gulp-shell');
var merge = require('merge-stream');

module.exports = function () {
	return function () {
		var imgs = gulp.src(['images/**/*']).pipe(gulp.dest('./dist/images'));
		var fonts = gulp.src(['fonts/**/*']).pipe(gulp.dest('./dist/fonts'));
		var ghFiles = gulp.src(['CNAME']).pipe(gulp.dest('./dist/'));

		return merge(imgs, fonts, ghFiles);
	};
};
