'use strict'

module.exports = function (app){
	let controller = {};
	
	let Enterprise = app.models.estabelecimento;

	controller.getEnterprises = (req, res, next) => {
		Enterprise.findAsync().then((data) => {
			console.log('Bateu aqui');
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
		req.sanitizeBody('picture').trim();
		req.sanitizeBody('street').trim();
		req.sanitizeBody('number').trim();
		req.sanitizeBody('neighborhood').trim();
		req.sanitizeBody('city').trim();
		
		let { name, picture, street, number, neighborhood, city } = req.body;
		let enterprise = new Enterprise;

		req.checkBody({
			name: {
				notEmpty: true,
				errorMessage: 'Nome inválido!'
			},
			picture: {
				optional: true
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

		req.asyncValidationErrors().then(() => {
			enterprise.name = name;
			enterprise.picture = picture;
			enterprise.address.street = street;
			enterprise.address.number = number;
			enterprise.address.neighborhood = neighborhood;
			enterprise.address.city = city;
		
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
		let { name, picture, street, number, neighborhood, city } = req.body;
		let address = { 'street': street, 'number': number, 'neighborhood': neighborhood, 'city': city }
		
		req.checkBody({
			_id: {
				notEmpty: true,
				errorMessage: 'ID não informado'
			},
			name: {
				notEmpty: true,
				errorMessage: 'Nome inválido!'
			},
			picture: {
				optional: true
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
			let data = { name, picture, address };
			Enterprise.findByIdAndUpdate(_id, data).exec().then(data => {
				res.status(202).json(data);
			}, (e) => res.status(404).json({ err: 'Erro ao atualizar dados!' }));
		}).catch((err) => {
			res.status(400).json(err);
		});
	}

	controller.deleteEnterprise = (req, res) => {
		let _id = req.params.id;

		req.checkParams('id', 'Não informado').notEmpty();

		let erros = req.asyncValidationErrors().then(() => {
			Enterprise.findByIdAndRemove(_id).exec().then(data => { res.status(200).json(data) }, (e) => res.status(404).json({ err: 'Impossivel remover empresa' }));
		}).catch((err) => {
			res.status(400).json(err);
		});
	}

	return controller;
}