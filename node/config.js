var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');



module.exports = function(app) {


    app.set('views', './views/html');
    app.set('view engine', 'ejs');
    app.use(express.static('static'));

    app.use(session({
        secret: 'keyboard cat'
    }));

    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));



    return app;
};