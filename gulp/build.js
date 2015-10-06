'use strict';

var gulp = require('gulp');

gulp.task('build', ['compile:typescript', 'compile:markups', 'compile:styles']);
