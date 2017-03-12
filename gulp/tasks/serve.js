'use strict';

import browserSync from 'browser-sync';

const server = browserSync.create();

module.exports = (options) => {
    return () => {
        server.init(options.browserSync);

        server.watch(options.watchSrc)
            .on('change', server.reload);
    };
};
