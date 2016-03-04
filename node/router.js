//登陆
var login = require('../controllers/login.js');


module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', {
            title: 'abc'
        });
    });


    app.get('/login', login.get);
    app.post('/login', login.post);
    app.get('/logout', login.logout);

    //会员首页
    app.get('/member', auth, function(req, res, next) {
        res.render('member/index');
    });

    //验证是否登陆
    function auth(req, res, next) {
        if (req.session && req.session.sign) {
            next();
        } else {
            res.redirect('/login');
        }
    }


    return app;

};