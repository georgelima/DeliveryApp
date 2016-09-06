'use strict'

module.exports = function(app) {
  let controller = app.controllers.pedido;

  app.route('/api/order/')
		.put(controller.postOrder)
		.get(controller.getAllOrders);

	app.route('/api/order/:idUser')
		.get(controller.getOrdersByUser);

	app.route('/api/order/:idOrder')
		.put(controller.changeStatusOrder);
}