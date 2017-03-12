'use strict';

import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';

const $ = gulpLoadPlugins();

module.exports =
    (options, gulp) =>
        () => combiner.obj(
            gulp.src(options.src),
            $.pug(options.pug),
            gulp.dest(options.dest)
        ).on('error', $.notify.onError());

