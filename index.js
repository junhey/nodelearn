var express = require('express');
var app = express();


require('./node/config.js')(app); //config
require('./node/router.js')(app); //路由设置


var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');



mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('yay!');
});


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



// User.remove({}, function(err) {
//     if (err) return handleError(err);
// });
// app.set('views', './views/html');
// app.set('view engine', 'ejs');
// app.use(express.static('static'));



// app.use('/', function(req, res, next) {

//     if (req.session.sign) {
//         next();
//     }

//     // return res.redirect('/login');
// });



// accounts.isLogin({
//     success: function() {
//         app.get('news')
//     },
//     fail: function() {

//     }
// });


// app.post('/', function(req, res) {
//     var hasher = crypto.createHash("sha256");

//     var user = new User({
//         username: req.body.username,
//         password: hasher.update(req.body.password).digest('hex')
//     });

//     user.save(function(err) {
//         if (err) {
//             res.redirect('/');
//         } else {
//             user.save();
//             User.find(function(err, persons) {
//                 res.json(persons);
//             });
//         }
//     });
// });



var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});