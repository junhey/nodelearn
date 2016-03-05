var mongoose = require('mongoose');
var CateModel = require('../node/schema.js').CateModel;



module.exports = {

    add: function(req, res) {
        var cate = new CateModel({
            cate_name: req.body.cate_sort,
            cate_sort: Number(req.body.cate_sort)
        });
        cate.save(function(err) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    error_code: 0,
                    msg: '操作成功！'
                });
            }
        });
    },

    edit: function() {



    }
};