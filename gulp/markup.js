'use strict';

var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('compile:markups', function () {
    function renameToHtml(path) {
        path.extname = '.html';
    }

    return gulp.src(conf.paths.markups)
        .pipe($.consolidate('jade', { basedir: conf.paths.src, doctype: 'html', pretty: '  ' }))
        .pipe($.rename(renameToHtml))
        .pipe(gulp.dest(conf.paths.dist))
});
