var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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

module.exports = mongoose.model('Cate', CateSchema);