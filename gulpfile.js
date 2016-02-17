/* CONFIGS */
var htmlFiles = ['index', 'contacts'];

/* Gulp tasks */
var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('daemon', function() {
  gulp.watch('css/**/*.css', ['css']);
  gulp.watch('bower_components/**/*.css', ['css']);
  gulp.watch('bower_components/**/*.js', ['js']);
  gulp.watch('tpl/**/*.ejs', ['html-render']);
  gulp.watch('bower_components/r5m-cms/**/*.ejs', ['html-render']);
});


gulp.task('js', function() {
  gulp.src(['bower_components/requirejs/require.js', 'bower_components/r5m-cms/js/start.js'])
    .pipe(shell([
      './node_modules/.bin/r.js -o \
        generateSourceMaps=true \
        preserveLicenseComments=false \
        optimize=uglify2 \
        normalizeDirDefines=skip \
        baseUrl=. \
        paths.r5m=bower_components/r5m-cms/js \
        paths.vendor=bower_components \
        name=bower_components/r5m-cms/js/index \
        out=dist/lp.js'
    ]))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', shell.task([
  './node_modules/.bin/r.js -o cssIn=bower_components/r5m-cms/css/all.css out=dist/engine.css',
  './node_modules/.bin/r.js -o cssIn=css/project.css out=dist/lp.css'
]));


var htmlCompileScripts = [];
var htmlRenderScripts = [];
htmlFiles.forEach(function(fileName) {
  htmlCompileScripts.push('./node_modules/.bin/ejs-on-command tpl/' + fileName + '.ejs -j \'{"filename": "./tpl/' + fileName + '"}\' > dist/html/' + fileName + '.html');
  htmlRenderScripts.push('./node_modules/.bin/html-minifier --config-file ./.htmlminirc -o ' + fileName + '.html ./dist/html/' + fileName + '.html');
});

gulp.task('html-compile', shell.task(htmlCompileScripts));

gulp.task('html-render', ['html-compile'], shell.task(htmlRenderScripts));

gulp.task('install', shell.task([
  'mkdir ./dist/html',
  './node_modules/.bin/bower install https://github.com/milikhin/r5m-client.git',
  'cd bower_components/r5m-cms; git init; \
	git remote add origin git@github.com:milikhin/r5m-client.git; \
	git add --all; \
	git rm --cached .bower.json; \
	git pull origin master;'
]));


gulp.task('default', ['js', 'css', 'html-render', 'daemon']);
