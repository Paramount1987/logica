'use strict';

import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';

const $ = gulpLoadPlugins();

module.exports =
    (options, gulp) =>
        (callback) => {
            if (options.paths && options.paths.length) {
                options.paths.forEach((path, i) => {
                    combiner
                        .obj(
                            gulp.src(path.src, {
                                since: gulp.lastRun(options.taskName)
                            }),
                            gulp.dest(path.dest)
                        )
                        .on('error', $.notify.onError())
                        .on('data', () => {
                            if (i === options.paths.length - 1) {
                                callback();
                            }
                        });
                });
            } else {
                callback();
            }
        };
