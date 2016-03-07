var service = require('./service');



function error(res, msg) {
    res.json({
        error_code: 1,
        msg: msg
    });
}



module.exports = {
    login: function(req, res) {
        service.login(req, res);
    },

    register: function(req, res) {

        var username = req.body.username || '';
        var password = req.body.password;
        var repassword = req.body.re_password;

        username = username.trim(); //去除空格

        if (!username.length) {
            error(res, '用户名不可以为空');
            return;
        }

        if (password !== repassword) {
            error(res, '两次输入的密码不一致');
            return;
        }

        if (password.length < 6 || password.length > 20) {
            error(res, '密码必须是6-20位的字符');
            return;
        }

        service.register(req, res);
    }
};