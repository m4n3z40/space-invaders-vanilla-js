var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
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
        html: './index.html',
        scripts: './scripts/main.js',
        stylus: './styles/main.styl'
    },
    distSources = {
        js: './dist/js',
        css: './dist/css'
    };

/**
 * PUT DEV SERVER UP
 */
gulp.task('connect', function() {
    connect.server({
       livereload: true,
        host: server.host,
        port: server.port
    });
});

/**
 * OPEN THE DEFAULT BROWSER AT THE SERVER URL
 */
gulp.task('open', function() {
    gulp.src(sources.html)
        .pipe(open('', {url: 'http://' + server.host + ':' + server.port}));
});

/**
 * HELPER TO RELOAD THE BROWSER WHEN THE INDEX.HTML HAS CHANGED
 */
gulp.task('html', function() {
    gulp.src(sources.html)
        .pipe(connect.reload());
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
gulp.task('serve', ['html', 'stylus-dev', 'browserify-dev', 'connect', 'open'], function() {
    gulp.watch('./**/*.html', ['html']);
    gulp.watch('./styles/**/*.styl', ['stylus-dev']);
    gulp.watch('./scripts/**/*.js', ['browserify-dev']);
});

/**
 * DEFAULT: CREATE DIST FILES
 */
gulp.task('default', ['stylus-prod', 'browserify-prod']);