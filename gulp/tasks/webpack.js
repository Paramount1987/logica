'use strict';

import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';

const $ = gulpLoadPlugins();

module.exports =
    (options, gulp) =>
        (callback) => {
            let firstBuildReady = false;

            function done(err, stats) {
                firstBuildReady = true;

                if (err) {
                    return;
                }

                $.gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
                    colors: true
                }));
            }

            return combiner.obj(
                gulp.src(options.src),
                named(),
                webpackStream(options.webpackConfig, null, done),
                gulp.dest(options.dest)
            )
            .on('error', $.notify.onError())
            .on('data', function () {
                if (firstBuildReady) {
                    callback();
                }
            });
        };
