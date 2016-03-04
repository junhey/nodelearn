var mongoose = require('mongoose');
var crypto = require('crypto');



function login(body) {
    var hasher = crypto.createHash("sha256");
    var username = body.username;
    var password = hasher.update(body.password).digest('hex');


    var User = mongoose.model('User');

    User.find(function(err, persons) {
        res.json(persons);
    });
}


function isUser(opt) {
    var hasher = crypto.createHash("sha256");
    var username = opt.username;
    var password = hasher.update(opt.password).digest('hex');
    var User = mongoose.model('User');

    User.find({
        username: username,
        password: password
    }, function(err, persons) {
        if (persons.length) {
            opt.success.call(this, persons);
        } else {
            opt.fail.call(this, persons);
        }
    });
}

module.exports = {
    isUser: isUser,
    login: login
};