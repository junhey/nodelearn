var service = require('./service');

module.exports = {
    index: function(req, res) {
        service.index(req, res);
    }
};