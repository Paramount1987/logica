'use strict';

import del from 'del';

module.exports = (options) => {
    return () => del(options.dest);
};
