//登陆
// var loginController = require('../controllers/login.js');
// var cateController = require('../controllers/cate.js');


var user = require('./user/index'); //用户模块
var cate = require('./cate/index'); //分类表
var url = require('./url/index'); //网址

module.exports = function(app) {



    // var mapping = ['/member'];

    // mapping.forEach(function(item) {
    //     app.all(item, auth);
    // });

    // //验证是否登陆
    // function auth(req, res, next) {
    //     if (req.session && req.session.sign) {
    //         next();
    //     } else {
    //         res.redirect('/login');
    //     }
    // }


    // app.get('/', function(req, res) {
    //     res.render('index', {
    //         title: 'abc'
    //     });
    // });


    //用户模块
    app.get('/login', function(req, res, next) {
        res.render('login');
    });

    app.get('/register', function(req, res, next) {
        res.render('register');
    });

    app.get('/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });

    app.post('/login', user.login);

    app.post('/register', user.register);


    //分类模块



    //会员首页
    app.get('/member', function(req, res, next) {
        res.render('member/index');
    });

    // //网址列表
    // app.get('/member/url', function(req, res, next) {
    //     res.render('member/url/list');
    // });

    // //添加网址
    // app.get('/member/url/save', function(req, res, next) {
    //     res.render('member/url/save');
    // });
    // app.get('/member/url/save/:id', function(req, res, next) {
    //     res.render('member/url/save');
    // });

    app.get('/member/url', url.list);
    app.get('/member/url/list', url.list);
    app.all('/member/url/save', url.save);
    app.all('/member/url/del', url.del);


    //分类列表
    app.get('/member/cate', cate.list);
    app.get('/member/cate/list', cate.list);
    app.all('/member/cate/save', cate.save);
    app.all('/member/cate/del', cate.del);

    return app;



};