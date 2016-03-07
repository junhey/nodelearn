var service = require('./service');

module.exports = {
    list: function(req, res) {
        var xr = req.headers['x-requested-with'] || '';

        if (xr.toLowerCase() == 'xmlhttprequest') {
            service.getList(req, res);
        } else {
            res.render('member/url/list');
        }
    },
    save: function(req, res) {
        if (req.query.id || req.body.id) {
            service.edit(req, res);
        } else {
            service.add(req, res);
        }
    },
    del: function(req, res) {
        service.del(req, res);
    }
};