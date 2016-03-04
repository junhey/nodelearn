var accounts = require('../service/accounts.js');



function get(req, res) {
    res.render('login');
}

function post(req, res) {
    accounts.isUser({
        username: req.body.username,
        password: req.body.password,
        success: function(persons) {
            console.log(persons);
        },
        fail: function(persons) {
            res.send({
                error_code: 1,
                msg: '用户名或密码错误！'
            });
        }
    });
}


module.exports = {
    get: get,
    post: post
};