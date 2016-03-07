var mongoose = require('mongoose');
var UrlModel = mongoose.model('Url');
var CateModel = mongoose.model('Cate');
module.exports = {

    index: function(req, res) {

        var no = Number(req.query.page_no) - 1 || 0;
        var size = Number(req.query.page_size) || 10;
        var countNo = 0;

        CateModel.find({}, function(err, cate) {

            var cates = {};

            cate.forEach(function(item) {
                cates[item._id] = item.cate_name;
            });


            var callback = function(err, persons) {


                persons.forEach(function(item) {
                    item.cn_cate = cates[item.cate_name]
                });



                if (persons) {
                    console.log(persons);
                    res.render('index', {
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

    }
};