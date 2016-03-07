var mongoose = require('mongoose');
var crypto = require('crypto');


function login(req, res) {

    var hasher = crypto.createHash("sha256");
    var User = mongoose.model('User');

    User.find({
        username: req.body.username,
        password: hasher.update(req.body.password).digest('hex')
    }, function(err, persons) {
        if (persons.length) {
            req.session.sign = true;
            req.session.name = 'node';
            req.session.cookie.maxAge = 3600000;
            res.send({
                error_code: 0,
                msg: '欢迎登录'
            });
            res.end();
        } else {
            res.send({
                error_code: 1,
                msg: '用户名或密码错误！'
            });
        }
    });
}


function register(req, res) {
    var User = mongoose.model('User');
    var hasher = crypto.createHash("sha256");


    User.create({
        username: req.body.username,
        password: hasher.update(req.body.password).digest('hex')
    }, function(err) {
        if (err) {
            res.json({
                error_code: 1,
                msg: err.message
            });
        } else {
            res.json({
                error_code: 0,
                msg: '用户注册成功'
            });
        }
    });


}

module.exports = {
    login: login,
    register: register
};