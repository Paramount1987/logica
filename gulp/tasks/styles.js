'use strict';

import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';

const $ = gulpLoadPlugins();

module.exports =
    (options, gulp, isDevelopment) =>
        () => combiner.obj(
            gulp.src(options.src),
            $.if(isDevelopment, $.sourcemaps.init()),
            $.sassGlob(),
            $.sass(options.sass),
            $.autoprefixer(options.autoprefixer),
            $.if(!isDevelopment, $.cssnano(options.cssnano)),
            $.if(isDevelopment, $.sourcemaps.write()),
            gulp.dest(options.dest)
        ).on('error', $.notify.onError());
