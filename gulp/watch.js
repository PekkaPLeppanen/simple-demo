'use strict';

var gulp = require('gulp');
var conf = require('./conf');

gulp.task('watch', function () {
    gulp.watch(conf.paths.scripts, ['lint:typescript', 'compile:typescript']);
    gulp.watch(conf.paths.markups, ['compile:markups']);

});