var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


//用户表
var UserSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
}, {
    strict: true
});
UserSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', UserSchema);