'use strict';

import webpack from 'webpack';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDevelopment = nodeEnv.includes('development');
const watch = nodeEnv.includes('watch');

export default {
    serve: {
        watchSrc: './build/**/*.*',
        browserSync: {
            server: {
                baseDir: './build',
                directory: false
            },
            reloadDelay: 0,
            reloadOnRestart: false,
            online: true,
            open: false,
            port: 3000,
            ghostMode: {
                clicks: false,
                forms: false,
                scroll: false
            },
            notify: true,
            injectChanges: true
        }
    },

    clean: {
        dest: [
            './build',
            './tmp',
            '.sass-cache'
        ]
    },

    sprites: {
        src: [
            './src/img/sprites/**/*.png'
        ],
        dest: './tmp/sprites',
        spritesmith: {
            padding: 4,
            algorithm: 'binary-tree',
            algorithmOpts: {
                sort: false
            },
            cssOpts: {
                functions: false
            }
        }
    },

    images: {
        src: [
            './src/img/**/*.{png,jpg,gif,svg}',
            '!./src/img/sprites/**',
            './tmp/sprites/*.{png,jpg,gif}'
        ],
        dest: './build/img',
        imagemin: {
            progressive: true
        }
    },

    templates: {
        src: './src/pug/*.pug',
        dest: './build',
        pug: {
            pretty: '    '
        }
    },

    styles: {
        src: './src/scss/index.scss',
        dest: './build/css',
        watchSrc: './src/scss/**/*.scss',
        sass: {},
        autoprefixer: {
            browsers: ['last 5 versions'],
            cascade: false
        },
        cssnano: {
            zindex: false,
            autoprefixer: false
        }
    },

    webpack: {
        src: './src/js/*.js',
        dest: './build/js',
        webpackConfig: {
            output: {
                publicPath: './js/'
            },
            watch: watch,
            devtool: isDevelopment ? 'cheap-inline-module-source-map' : null,
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            plugins: [
                new webpack.NoErrorsPlugin(),
                !isDevelopment ? new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false,
                        drop_console: true,
                        unsafe: true
                    }
                }) : () => {}
            ]
        }
    },

    fonts: {
        src: './src/fonts/**/*.{woff2,woff,eot,ttf,svg}',
        dest: './build/fonts'
    },

    copy: {
        paths: [
            {
                src: './src/content/**/*.*',
                dest: './build/content'
            },
            {
                src: './src/js/vendor/*.*',
                dest: './build/js/vendor'
            }
        ]
    }
};
