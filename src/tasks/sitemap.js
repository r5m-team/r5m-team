var gulp = require('gulp');
var sitemap = require('gulp-sitemap');

module.exports = function (url) {
	return function () {
		return gulp.src(url+'/**/*.html')
				.pipe(sitemap({
					siteUrl: 'https://r5m.me'
				}))
				.pipe(gulp.dest(url));
	};
};
