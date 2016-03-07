var mongoose = require('mongoose');
var UrlModel = mongoose.model('Url');
var CateModel = mongoose.model('Cate');

module.exports = {

    getList: function(req, res) {

        var no = Number(req.query.page_no) - 1 || 0;
        var size = Number(req.query.page_size) || 10;
        var countNo = 0;

        CateModel.find({}, function(err, cate) {

            var cates = {};

            cate.forEach(function(item) {
                cates[item._id] = item.cate_name;
            });


            var callback = function(err, persons) {

                var arr = [];


                persons.forEach(function(item) {
                    item.name = 'fasdfasdf';
                });


                if (persons) {
                    res.json({
                        total_count: countNo,
                        cate: cates,
                        list: persons,
                        success: 1,
                        msg: '操作成功！'
                    });
                } else {
                    res.json(err);
                }
            }



            UrlModel.count({}, function(err, count) {
                countNo = count;
                UrlModel.find({}).skip(no * size).limit(size).exec(callback);
            });
        });



    },

    add: function(req, res) {



        var xr = req.headers['x-requested-with'] || '';

        if (xr.toLowerCase() == 'xmlhttprequest') {
            var cate = new UrlModel({
                url_name: req.body.url_name,
                url_url: req.body.url_url,
                url_cate: req.body.url_cate
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

            CateModel.find({}, function(err, list) {
                res.render('member/url/save', {
                    cate: list
                });
            });


        }
    },

    edit: function(req, res) {
        var xr = req.headers['x-requested-with'] || '';

        if (xr.toLowerCase() == 'xmlhttprequest') {
            UrlModel.update({
                _id: req.body.id
            }, {
                url_cate: req.body.url_cate,
                url_name: req.body.url_name,
                url_url: req.body.url_url
            }, function(err, persons) {
                if (!err) {
                    res.json({
                        error_code: 0,
                        msg: '修改成功！'
                    });
                }
            });
        } else {
            UrlModel.find({
                _id: req.query.id
            }, function(err, persons) {

                CateModel.find({}, function(err, list) {

                    persons[0].cate = list;
                    res.render('member/url/save', persons[0]);
                });
            });
        }
    },

    del: function(req, res) {

        UrlModel.remove({
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