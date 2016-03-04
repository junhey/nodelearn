var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');

var UrlCateSchema = mongoose.Schema({
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

var urlCate = mongoose.model('User', UrlCateSchema);



module.exports = {
    add: function() {

        var urlCate = UserSchema User({
            username: req.body.cate_name,
            password: req.body.cate_sort
        });

        urlCate.save(function(err) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    error_code: 0,
                    msg: '操作成功！'
                });
            }
        });

    }
};