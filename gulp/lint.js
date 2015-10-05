// ** Linting ** //

'use strict';

var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('lint', ['lint:typescript']);
gulp.task('lint:typescript', function(){
    return gulp.src(conf.paths.scripts)
        .pipe($.tslint())
        .pipe($.tslint.report('prose', { emitError: false }));
});