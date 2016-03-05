var cateService = require('../service/cate.js');

function list(req, res) {

    var xr = req.headers['x-requested-with'] || '';


    if (xr.toLowerCase() == 'xmlhttprequest') {
        // 是AJAX请求
        console.log('ajax');

        cateService.getList(req, res);
    } else {
        res.render('member/url/cate_list');
    }


}

function save(req, res) {
    var body = req.body;



    if (body.cate_id) {
        cateService.edit(req, res);
    } else {
        cateService.add(req, res);
    }

}


function del(req, res) {}


module.exports = {
    list: list,
    save: save,
    del: del
};