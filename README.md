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


app.post('/page1', function (req, res) {
  res.send('Got a page1');
});

app.post('/page1', function (req, res) {
  res.send('Got a page2');
});
```
访问：http://127.0.0.1:3000/page1 相信也能成功
访问：http://127.0.0.1:3000/page2 相信也能成功