require('./schema');
var controller = require('./controller');



module.exports = {
    login: controller.login,
    register: controller.register
};