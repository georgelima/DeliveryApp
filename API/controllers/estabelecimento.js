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

		Enterprise.findById(id).exec().then((data) => {
			res.status(200).json(data);
		}, e => {
			res.status(404).json({ err: 'Erro ao carregar Empresa' });
		});
	}

	controller.postEnterprise = (req, res) => {
		let { name, picture, address, menu } = req.body;
		let enterprise = new Enterprise;
		enterprise.name = name;
		enterprise.picture = picture;
		enterprise.address = address;
		enterprise.menu = menu;		

		enterprise.saveAsync().then((enterprise) => {
			res.status(201).json(enterprise);
		}, err => {
			res.status(500).json({ err: 'Impossivel cadastrar empresa!' });
		});
	}

	controller.putEnterprise = (req, res) => {
		let _id = req.body._id;
		let { name, picture, address, menu } = req.body;
		let data = { name, picture, address, menu };
		Enterprise.findByIdAndUpdate(_id, data).exec().then(data => {
			res.status(202).json(data);
		}, (e) => res.status(404).json({ err: 'Erro ao atualizar dados!' }));
	}

	controller.deleteEnterprise = (req, res) => {
		let _id = req.params.id;
		Enterprise.findByIdAndRemove(_id).exec().then(data => { res.status(200).json(data) }, (e) => res.status(404).json({ err: 'Impossivel remover empresa' }));
	}

	return controller;
}