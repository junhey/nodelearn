//登陆
var loginController = require('../controllers/login.js');
var cateController = require('../controllers/cate.js');


module.exports = function(app) {



    var mapping = ['/member'];

    mapping.forEach(function(item) {
        app.all(item, auth);
    });

    //验证是否登陆
    function auth(req, res, next) {
        if (req.session && req.session.sign) {
            next();
        } else {
            res.redirect('/login');
        }
    }


    app.get('/', function(req, res) {
        res.render('index', {
            title: 'abc'
        });
    });

    app.get('/login', loginController.get);
    app.post('/login', loginController.post);
    app.get('/logout', loginController.logout);

    //会员首页
    app.get('/member', function(req, res, next) {
        res.render('member/index');
    });


    //网址列表
    app.get('/member/url', function(req, res, next) {
        res.render('member/url/list');
    });

    //添加网址
    app.get('/member/url/save', function(req, res, next) {
        res.render('member/url/save');
    });

    app.get('/member/url/save/:id', function(req, res, next) {
        res.render('member/url/save');
    });


    //分类列表
    app.get('/member/url/cate-list', function(req, res, next) {
        res.render('member/url/cate_list');
    });


    app.get('/member/url/cate-save', function(req, res, next) {
        res.render('member/url/cate_save');
    });

    app.post('/member/url/cate-save', cateController.save);

    return app;



};