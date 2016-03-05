var mongoose = require('mongoose');
var CateModel = require('../node/schema.js').CateModel;



module.exports = {

    getList: function(req, res) {


        var no = Number(req.query.page_no) - 1 || 0;
        var size = Number(req.query.page_size) || 10;
        var countNo = 0;


        var callback = function(err, persons) {
            if (persons) {
                res.json({
                    total_count: countNo,
                    list: persons,
                    success: 1,
                    msg: '操作成功！'
                });
            } else {
                res.json(err);
            }
        }


        CateModel.count({}, function(err, count) {
            countNo = count;
            CateModel.find({}).skip(no * size).limit(size).exec(callback);
        });



    },

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
                    success: 1,
                    msg: '操作成功！'
                });
            }
        });
    },

    edit: function() {



    }
};