var mongoose = require('mongoose');
var CateModel = require('./schema.js');



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
            CateModel.find({}).sort('-cate_sort').skip(no * size).limit(size).exec(callback);
        });

    },

    add: function(req, res) {
        var xr = req.headers['x-requested-with'] || '';

        if (xr.toLowerCase() == 'xmlhttprequest') {
            var cate = new CateModel({
                cate_name: req.body.cate_name,
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
        } else {
            res.render('member/cate/save');
        }
    },

    edit: function(req, res) {
        var xr = req.headers['x-requested-with'] || '';

        if (xr.toLowerCase() == 'xmlhttprequest') {
            CateModel.update({
                _id: req.body.id
            }, {
                cate_name: req.body.cate_name,
                cate_sort: Number(req.body.cate_sort)
            }, function(err, persons) {
                if (!err) {
                    res.json({
                        error_code: 0,
                        msg: '修改成功！'
                    });
                }
            });
        } else {
            CateModel.find({
                _id: req.query.id
            }, function(err, persons) {
                res.render('member/cate/save', persons[0]);
            });
        }
    },

    del: function(req, res) {

        CateModel.remove({
            _id: req.body.id
        }, function(err) {
            if (!err) {
                res.json({
                    error_code: 0,
                    msg: '删除成功！'
                });
            }
        });

    }
};