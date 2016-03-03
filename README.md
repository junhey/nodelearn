## 当前分支 Express 学习

## Express安装
```
npm install express
```

## Express 第一个页面
```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
```
查看：http://127.0.0.1:3000/ 如看到了Hello World!就代表成功了！

## Express 添加路由
```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

//添加1页面
app.get('/page1', function (req, res) {
  res.send('Got a page1');
});

//添加2个页面
app.get('/page2', function (req, res) {
  res.send('Got a page2');
});
```
访问：http://127.0.0.1:3000/page1 相信也能成功
访问：http://127.0.0.1:3000/page2 相信也能成功

## 使用ejs

一、安装：
```
npm install ejs
```

二、建创views目录

三、在views目录创建index.ejs
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>express Examples</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">
</head>
<body>
    <h1>title:<%=title%></h1>
    <p>message:<%=message%></p>
</body>
</html>
```

四、js里配置
```js
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
```
五、重启服务
```
npm start
```

六、访问http://127.0.0.1:3000/
