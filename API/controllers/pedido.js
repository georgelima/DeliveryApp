'use strict'

module.exports = function(app) {
  let controller = {};
  
  let Order = app.models.pedido;

  controller.postOrder = (req, res) => {
		let userId = req.body.userId;
		let order = req.body.pedido;
		let address = req.body.endereco;
		let idEnterprise = req.body.idEnterprise;
		let totalPrice = req.body.totalPrice;

		req.checkBody({
			userId: {
				notEmpty: false,
				errorMessage: 'Identificador do usuário não informado',
			},
			idEnterprise: {
				notEmpty: false,
				errorMessage: 'Identificador do estabelecimento não informado!'
			}
		})

		let erros = req.asyncValidationErrors().then(() => {
			let orderFinnaly = new Order;
      orderFinnaly.idUser = userId;
      orderFinnaly.enterprise = idEnterprise;
      orderFinnaly.items = order;
      orderFinnaly.address = address;
      orderFinnaly.totalPrice = totalPrice;
      
      orderFinnaly.saveAsync().then((data) => {
        app.get('io').emit('newOrder', data);
				res.status(200).json(data);
      }).catch((err) => {
        res.status(500).json(err);
      });

		}).catch((err) => {
			res.status(400).json(err);
		});
	};

	controller.getAllOrders = (req, res) => {
		Order.find().populate('enterprise').exec().then((data) => {
			res.status(200).json(data);
		}).catch((err) => {
				res.status(404).json(err);
		});
	}

	controller.getOrdersByUser = (req,res) => {
		let ordersOfUser = [];
		let idUser = req.params.idUser;

		req.checkParams('idUser', 'ID não informado!').notEmpty();

		let erros = req.asyncValidationErrors().then(() => {
			Order.find({ 'idUser': idUser }).populate('enterprise').exec().then((data) => {
				res.status(200).json(data);
			}).catch((err) => {
				res.status(404).json(err);
			});
		}).catch((err) => {
			res.status(400).json(err);
		});
	}

	controller.changeStatusOrder = (req, res) => {
		let idOrder = req.params.idOrder;
		let status = req.body.status;
		
		req.checkParams('idOrder', 'ID do pedido não informado').notEmpty();

		let erros = req.asyncValidationErrors().then(() => {
			
			Order.findByIdAndUpdate(idOrder, {$set: { status }}).exec().then((data) => {
				res.status(202).json(data);
			}).catch((err) => {
				res.status(404).json(err);
			});

		}).catch((err) => {
			res.status(400).json(err);
		})
	}

  return controller;
}