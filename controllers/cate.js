var cateService = require('../service/cate.js');

function list(req, res) {}

function save(req, res) {
    var body = req.body;



    if (body.cate_id) {
        cateService.edit(req, res);
    } else {
        console.log(body);
        cateService.add(req, res);
    }

}


function del(req, res) {}


module.exports = {
    list: list,
    save: save,
    del: del
};