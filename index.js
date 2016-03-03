var express = require('express');
var app = express();


app.set('views', './views');//views, 放模板文件的目录
app.set('view engine', 'ejs'); //view engine, 模板引擎

//然后创建一个路由渲染 index.ejs 文件。如果没有设置 view engine，您需要指明视图文件的后缀，否则就会遗漏它。
app.get('/', function (req, res) {
    //此时向主页发送请求，“index.jade” 会被渲染为 HTML。
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});