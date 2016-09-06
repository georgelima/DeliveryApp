'use strict'

module.exports = function (app) {
	let controller = app.controllers.estabelecimento;

	app.route('/api/enterprise')
		.get(controller.getEnterprises)
		.post(controller.postEnterprise)
		.put(controller.putEnterprise);

	app.route('/api/enterprise/:id')
		.get(controller.getEnterprise)
		.delete(controller.deleteEnterprise);

	app.route('/api/enterprise/:id/menu')
		.put(controller.putMenu);

	app.route('/api/enterprise/:id/menu/:idItem')
		.delete(controller.deleteItemMenu);
		
}