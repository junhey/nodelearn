var mongoose = require('mongoose');

module.exports = function(app) {
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(callback) {
        console.log('数据库成功启动!');
    });

    return app;
};