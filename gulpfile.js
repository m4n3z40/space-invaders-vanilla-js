var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

/**
 * CONFIG
 */
var server = {
        host: 'localhost',
        port: 3000
    },
    sources = {
        jade: './**/*.jade',
        scripts: './scripts/main.js',
        stylus: './styles/main.styl'
    },
    distSources = {
        root: './dist',
        js: './dist/js',
        css: './dist/css'
    };

/**
 * PUT DEV SERVER UP
 */
gulp.task('connect', function() {
    connect.server({
        root: distSources.root,
        livereload: true,
        host: server.host,
        port: server.port
    });
});

/**
 * OPEN THE DEFAULT BROWSER AT THE SERVER URL
 */
gulp.task('open', function() {
    gulp.src(sources.jade)
        .pipe(open('', {url: 'http://' + server.host + ':' + server.port}));
});

/**
 * COMPILE JADE SOURCES IN DEVELOP MODE
 */
gulp.task('jade-dev', function() {
    gulp.src([sources.jade, '!./node_modules/**/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(distSources.root))
        .pipe(connect.reload());
});

/**
 * COMPILE JADE SOURCES IN PRODUCTION MODE
 */
gulp.task('jade-prod', function() {
    gulp.src([sources.jade, '!./node_modules/**/*.jade'])
        .pipe(jade({
            pretty: false
        }))
        .pipe(gulp.dest(distSources.root));
});

/**
 * COMPILE STYLUS CODE
 */
gulp.task('stylus-dev', function() {
    gulp.src(sources.stylus)
        .pipe(stylus())
        .pipe(gulp.dest(distSources.css))
        .pipe(connect.reload());
});

/**
 * COMPILE AND MINIFY STYLUS CODE
 */
gulp.task('stylus-prod', function() {
    gulp.src(sources.stylus)
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest(distSources.css));
});

/**
 * BUNDLE JS MODULES
 */
gulp.task('browserify-dev', function() {
    gulp.src(sources.scripts)
        .pipe(browserify())
        .pipe(gulp.dest(distSources.js))
        .pipe(connect.reload());
});

/**
 * BUNDLE AND MINIFY JS MODULES
 */
gulp.task('browserify-prod', function() {
    gulp.src(sources.scripts)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(distSources.js));
});

/**
 * DEVELOPMENT WATCHER WITH LIVE RELOAD
 */
gulp.task('serve', ['jade-dev', 'stylus-dev', 'browserify-dev', 'connect', 'open'], function() {
    gulp.watch(sources.jade, ['jade-dev']);
    gulp.watch('./styles/**/*.styl', ['stylus-dev']);
    gulp.watch('./scripts/**/*.js', ['browserify-dev']);
});

/**
 * DEFAULT: CREATE DIST FILES
 */
gulp.task('default', ['jade-prod', 'stylus-prod', 'browserify-prod']);