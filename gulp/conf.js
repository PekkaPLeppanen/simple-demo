'use strict';

var path = require('path');

var paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    types: path.join('types', 'tsd.d.ts'),
    test: 'test'
};

paths.scripts = path.join(paths.src, '/**/*.ts');
paths.markups = path.join(paths.src, '/**/*.jade');

/**
 *  The main paths of the project
 */
exports.paths = paths;