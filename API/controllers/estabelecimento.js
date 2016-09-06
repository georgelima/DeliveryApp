'use strict'

module.exports = function (app){
	let controller = {};
	
	let Enterprise = app.models.estabelecimento;

	controller.getEnterprises = (req, res, next) => {
		Enterprise.findAsync().then((data) => {
			res.status(200).json(data);
		}).catch((e) => {
			res.status(404).json({ err: 'Erro ao listar Empresas' });
		});
	}

	controller.getEnterprise = (req, res) => {
		let id = req.params.id;
		
		req.checkParams('id', 'Precisa ser uma string').notEmpty();
	
		let erros = req.asyncValidationErrors().then(() => {
			Enterprise.findById(id).exec().then((data) => {
				res.status(200).json(data);
			}, e => {
				res.status(404).json({ err: 'Empresa não localizada' });
			});
		}).catch((err) => {
			res.status(400).json(err);
		})
	}

	controller.postEnterprise = (req, res) => {
		req.sanitizeBody('name').trim();
		req.sanitizeBody('street').trim();
		req.sanitizeBody('number').trim();
		req.sanitizeBody('neighborhood').trim();
		req.sanitizeBody('city').trim();
		req.sanitizeBody('phone').trim();
		req.sanitizeBody('email').trim();
		
		let { name, street, number, neighborhood, city, phone, email } = req.body;
		let enterprise = new Enterprise;

		req.checkBody({
			name: {
				notEmpty: true,
				errorMessage: 'Nome inválido!'
			},
			street: {
				notEmpty: true,
				errorMessage: 'Rua Inválida'
			},
			number: {
				optional: true,
				errorMessage: 'Número Inválido'
			},
			neighborhood: {
				optional: true,
				errorMessage: 'Bairro Inválido'
			},
			city: {
				notEmpty: true,
				errorMessage: 'Cidade Inválida'
			},
			phone: {
				optional: true
			},
			email: {
				optional: true
			}
		});

		req.asyncValidationErrors().then(() => {
			enterprise.name = name;
			enterprise.address.street = street;
			enterprise.address.number = number;
			enterprise.address.neighborhood = neighborhood;
			enterprise.address.city = city;
			enterprise.contact.phone = phone;
			enterprise.contact.email = email;

			enterprise.saveAsync().then((enterprise) => {
				res.status(201).json(enterprise);
			}, err => {
				res.status(500).json({ err: 'Impossivel cadastrar empresa!' });
			});
		}).catch((err) => {
			res.status(400).json(err);
		});
	}

	controller.putEnterprise = (req, res) => {
		let _id = req.body._id;
		let { name, street, number, neighborhood, city, phone, email } = req.body;
		let address = { 'street': street, 'number': number, 'neighborhood': neighborhood, 'city': city }
		let contact = { 'phone': phone, 'email': email };
		req.checkBody({
			_id: {
				notEmpty: true,
				errorMessage: 'ID não informado'
			},
			name: {
				notEmpty: true,
				errorMessage: 'Nome inválido!'
			},
			street: {
				notEmpty: true,
				errorMessage: 'Rua Inválida'
			},
			number: {
				optional: true,
				errorMessage: 'Número Inválido'
			},
			neighborhood: {
				optional: true,
				errorMessage: 'Bairro Inválido'
			},
			city: {
				notEmpty: true,
				errorMessage: 'Cidade Inválida'
			}
		});

		let erros = req.asyncValidationErrors().then(() => {
			let data = { name, address, contact };
			Enterprise.findByIdAndUpdate(_id, data).exec().then(data => {
				res.status(202).json(data);
			}, (e) => res.status(404).json({ err: 'Erro ao atualizar dados!' }));
		}).catch((err) => {
			res.status(400).json(err);
		});
	}

	controller.putMenu = (req, res) => {
		let _id = req.params.id;

		let name = req.body.name;
		let price = req.body.price;
		let description = req.body.description;
		let kind = req.body.type;
		
		req.checkBody({
			name: {
				notEmpty: true,
				errorMessage: 'Nome não informado!'
			},
			price: {
				notEmpty: true,
				errorMessage: 'Valor não informado!'
			},
			description: {
				optional: true
			},
			kind: {
				notEmpty: true,
				errorMessage: 'Tipo não informado!'
			}
		});

		req.checkParams('id', 'Não Informado').notEmpty();
		let enterprise = new Enterprise;
		
		let erros = req.asyncValidationErrors().then(() => {
			
			Enterprise.findByIdAndUpdate(_id, { $push: { 'menu': req.body } }, { safe: true, upsert: true }).exec().then((data) => {
				res.status(202).json(data);
			}, (e) => {
				res.status(404).json(e);
			})

		}).catch((err) => {
			console.log(err);	
			res.status(400).json(err);
		})
	}

	controller.deleteEnterprise = (req, res) => {
		let _id = req.params.id;

		req.checkParams('id', 'Não informado').notEmpty();

		let erros = req.asyncValidationErrors().then(() => {
			Enterprise.findByIdAndRemove(_id).exec().then(data => { res.status(200).json(data) }, (e) => res.status(404).json({ err: 'Impossivel remover empresa' }));
		}).catch((err) => {
			res.status(400).json(err);
		});
	};

	controller.deleteItemMenu = (req, res) => {
		let id = req.params.id;
		let idItem = req.params.idItem;

		req.checkParams('id', 'Não informado').notEmpty();
		req.checkParams('idItem', 'Não informado').notEmpty();

		let erros = req.asyncValidationErrors().then(() => {
			Enterprise.update({ '_id': id }, { $pull: { 'menu': { '_id': idItem } } }).exec().then((data) => {
				res.status(202).json(data);
			}, (err) => res.status(404).json(err));
		}).catch((e) => { res.status(400).json(e) });
	};

	return controller;
}