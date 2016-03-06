var express = require('express');
var app = express();

require('./node/db.js')(app); //db
require('./node/config.js')(app); //config
require('./node/router.js')(app); //路由设置
// require('./node/schema.js'); //数据模型


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});