'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/all-data')
        .get(jsonku.tampilSemuaData);

    app.route('/data/:id')
        .get(jsonku.showById);

    app.route('/data/nim/:nim')
        .get(jsonku.showByNim);
};