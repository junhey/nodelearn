var express = require('express');
var app = express();


require('./node/config.js')(app); //config
require('./node/router.js')(app); //路由设置


var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var crypto = require('crypto');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('yay!');
});



var UserSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    strict: true
});
UserSchema.plugin(uniqueValidator);

var User = mongoose.model('User', UserSchema);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});