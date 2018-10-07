/**
 * gulplate - 2016.12.23
 * @autor yano3@alhino.jp
 * @see   working in vagrant(192.168.33.10).
 */

/**
 * [gulp-plugins]
 * input after '$ npm install --save-dev'.
 *   common
 *     gulp
 *     browser-sync
 *     gulp-plumber
 *   js
 *     riot
 *     babel babel-core babel-loader babel-cli
 *     babel-preset-es2015 babel-preset-es2015-riot
 *     babelify riotify
 *     browserify vinyl-source-stream vinyl-buffer
 *   css
 *     gulp-sass
 *     gulp-pleeease
 *   markdown
 *     gulp-markdown
 *
 *   ----
 *
 *   lib,fw
 *     riot, superagent, (jQuery)
 */

var assets = "./public";
var dirCss = assets+"/css/**/*.css";
var dirSass = assets+"/css/sass/**/*.scss";
var distSass = assets+"/css/";
var watchList = [
  "!node_modules",
  "./App/**/*.php",
  dirCss,
  dirSass,
];
console.log('Watch-files: ');
console.dir(watchList);


/**
* [Watch]
* live-reload & compile
*/
var gulp = require('gulp');
var plumber = require('gulp-plumber');
gulp.task('watch',['server'], function(){
  var gaze_opt = {
    debounceDelay: 5000 // wait 5 sec after the last run
  };
  gulp.watch(dirSass, gaze_opt, ['sass']);
  gulp.watch(watchList, gaze_opt, ['reload']);
});

/**
* [Common]
* - gulp: main
* - browser-sync: live-reload (*notice: require <body>)
* - plumber: keep running
*/
var browserSync = require('browser-sync').create();
gulp.task('server',function(){
  browserSync.init({
    notify: true,
    logPrefix: "SYNC",
    proxy: "192.168.33.10", // vagrant-proxy
  });
});
gulp.task('reload', function(){
  browserSync.reload();
});

/**
* [Sass]
* - gulp-sass: compile scss->css
* - gulp-pleeease: prefix, minify
*/
var sass     = require('gulp-sass');
var pleeease = require('gulp-pleeease');
gulp.task('sass', function() {
  gulp.src(dirSass)
    .pipe(plumber())
    .pipe(sass({
      style: "expanded"
    }))
    .pipe(pleeease({
      autoprefixer: {
        browsers: ['last 4 versions']
      },
      minifier: true
    }))
    .pipe(gulp.dest(distSass));
});
