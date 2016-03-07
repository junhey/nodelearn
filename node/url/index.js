require('./schema');
var controller = require('./controller');



module.exports = {
    list: controller.list,
    save: controller.save,
    del: controller.del
};