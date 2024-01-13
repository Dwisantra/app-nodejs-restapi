'use strict';

const { json } = require('body-parser');

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

    app.route('/add-data')
        .post(jsonku.tambahData);

    app.route('/update-data')
        .put(jsonku.updateData);
    
    app.route('/delete')
        .delete(jsonku.deleteData);

    app.route('/show-group')
        .get(jsonku.showGroup);
};