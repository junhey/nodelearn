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



//分类表
var CateSchema = mongoose.Schema({
    user_id: String,
    cate_name: {
        type: 'string',
        required: true,
        unique: true
    },
    cate_sort: {
        type: 'number',
        required: true
    }
}, {
    strict: true
});
CateSchema.plugin(uniqueValidator);


module.exports = {
    UserModel: mongoose.model('User', UserSchema),
    CateModel: mongoose.model('Cate', CateSchema)
};