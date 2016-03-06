var accounts = require('../service/accounts.js');


function get(req, res) {
    res.render('login');
}

function post(req, res) {

    accounts.isUser({
        username: req.body.username,
        password: req.body.password,
        success: function(persons) {
            req.session.sign = true;
            req.session.name = 'node';
            req.session.cookie.maxAge = 3600000;
            res.send({
                error_code: 0,
                msg: '欢迎登录'
            });
            res.end();
        },
        fail: function(persons) {
            res.send({
                error_code: 1,
                msg: '用户名或密码错误！'
            });
        }
    });
}

function getRegister(req, res){
    res.render('register');
}
function postRegister(req, res){
    res.send({
        error_code: 1,
        msg: '用户名或密码错误！'
    });
}

function logout(req, res) {
    req.session.destroy();
    res.redirect('/');
}


module.exports = {
    get: get,
    post: post,
    logout: logout,
    getRegister : getRegister,
    postRegister : postRegister
};