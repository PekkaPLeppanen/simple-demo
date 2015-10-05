'use strict';

var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var tsProject = $.typescript.createProject({
    module: 'commonjs',
    target: 'es5',
    declaration: false,
    removeComments: false, // Do not remove comments to enable JSDoc documentation
    noImplicitAny: true,
    sortOutput: true
});

// ** TypeScript compile ** //
gulp.task('compile:typescript', function () {
    return gulp.src([conf.paths.scripts, conf.paths.types])
        .pipe($.typescript(tsProject))
        .pipe(gulp.dest(conf.paths.dist))
        .pipe($.size());
});

