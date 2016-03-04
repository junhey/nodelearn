var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');



mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('yay!');
});


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


var UserSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    strict: true
});
UserSchema.plugin(uniqueValidator);

var User = mongoose.model('User', UserSchema);

User.remove({}, function(err) {
    if (err) return handleError(err);
});

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hey',
        message: 'Hello there!',
        users: [{
            name: 'tj'
        }, {
            name: 'mape'
        }, {
            name: 'guillermo'
        }]
    });
});


app.post('/', function(req, res) {
    var hasher = crypto.createHash("sha256");

    var user = new User({
        username: req.body.username,
        password: hasher.update(req.body.password).digest('hex')
    });

    user.save(function(err) {
        if (err) {
            res.redirect('/');
        } else {
            user.save();
            User.find(function(err, persons) {
                res.json(persons);
            });
        }
    });

});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});