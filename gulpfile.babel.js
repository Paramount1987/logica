'use strict';

import gulp from 'gulp';
import config from './gulp/config';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDevelopment = nodeEnv.includes('development');

function lazyRequireTask(taskName, path, options = {}) {
    options = Object.assign(options, config[taskName]);

    options.taskName = taskName;

    gulp.task(taskName, (callback) => {
        const task = require(path).call(this, options, gulp, isDevelopment);

        return task(callback);
    });
}

lazyRequireTask('serve', './gulp/tasks/serve');
lazyRequireTask('clean', './gulp/tasks/clean');
lazyRequireTask('sprites', './gulp/tasks/sprites');
lazyRequireTask('images', './gulp/tasks/images');
lazyRequireTask('templates', './gulp/tasks/templates');
lazyRequireTask('styles', './gulp/tasks/styles');
lazyRequireTask('webpack', './gulp/tasks/webpack');
lazyRequireTask('fonts', './gulp/tasks/fonts');
lazyRequireTask('copy', './gulp/tasks/copy');

// Static tasks

gulp.task('watch', () => {
    gulp.watch(
        config.sprites.watchSrc
        || config.sprites.src, gulp.series('sprites', gulp.parallel('templates', 'styles'))
    );
    gulp.watch(config.images.watchSrc || config.images.src, gulp.series('images'));
    gulp.watch(config.templates.watchSrc || config.templates.src, gulp.series('templates'));
    gulp.watch(config.styles.watchSrc || config.styles.src, gulp.series('styles'));
    gulp.watch(config.fonts.watchSrc || config.fonts.src, gulp.series('fonts'));
    gulp.watch(config.copy.watchSrc || config.copy.src, gulp.series('copy'));
});

gulp.task(
    'build',
    gulp.series(
        'clean',
        'sprites',
        'images',
        gulp.parallel(
            'templates',
            'styles',
            'webpack'
        ),
        'fonts',
        'copy'
    )
);

gulp.task(
    'default',
    gulp.series(
        'build',
        gulp.parallel(
            'serve',
            'watch'
        )
    )
);
