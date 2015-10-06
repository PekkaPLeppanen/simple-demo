'use strict';

var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('compile:styles', function () {
    return gulp.src(conf.paths.styles)
        .pipe($.less())
        .pipe(gulp.dest(conf.paths.dist));
});
