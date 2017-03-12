'use strict';

import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';

const $ = gulpLoadPlugins();

module.exports =
    (options, gulp, isDevelopment) =>
        (callback) => combiner.obj(
            gulp.src(options.src),
            $.spritesmithMulti({
                spritesmith: (groupOptions, group) => {
                    groupOptions = Object.assign(groupOptions, options.spritesmith);

                    groupOptions.cssTemplate = null;
                    groupOptions.imgName = `sp-${group}.png`;
                    groupOptions.imgPath = `../img/${groupOptions.imgName}`;
                    groupOptions.cssName = `sp-${group}.scss`;
                    groupOptions.cssSpritesheetName = `spsh-${group}`;
                    groupOptions.cssVarMap = function (sprite) {
                        sprite.name = `sp-${group}-${sprite.name}`;
                    };

                    if (groupOptions.retinaImgName) {
                        groupOptions.retinaImgName = `sp-${group}@2x.png`;
                        groupOptions.retinaImgPath = `../img/${groupOptions.retinaImgName}`;
                        groupOptions.cssRetinaSpritesheetName = `retina-spsh-${group}`;
                        groupOptions.cssRetinaGroupsName = `retina-${group}-groups`;
                    }
                }
            }),
            gulp.dest(options.dest)
        ).on('error', $.notify.onError());
