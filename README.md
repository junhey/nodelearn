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
查看：http://127.0.0.1:3000/