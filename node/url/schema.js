var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//分类表
var UrlSchema = mongoose.Schema({
    user_id: String,
    url_name: {
        type: 'string',
        required: true,
        unique: true
    },
    url_url: {
        type: 'string',
        required: true,
        unique: true
    },
    url_cate: {
        type: 'string',
        required: true
    }
}, {
    strict: true
});
UrlSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Url', UrlSchema);