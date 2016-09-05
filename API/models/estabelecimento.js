'use strict'

module.exports = function (app){
	const mongoose = require('mongoose');
	let _schema = new mongoose.Schema({
		'name': String,
		'address': {
			'street': String,
			'number': {
				'type': String,
				'default': 'S/N'
			},
			'neighborhood': String,
			'city': String
		},
		'contact': {
			'phone': String,
			'email': String
		},
		'menu':[{
			'name': String, 'price': Number, 'description': String, 'kind': String
		}],
		'orders': [{
			'idUser': String, 'items': [], 'address': {} , 'status': { type: String, default:'processing' }, 'totalPrice': Number, createdAt: { type: Date, default: Date.now } 
		}],
		'createdAt': {
			'type': Date,
			'default': Date.now
		}
	});
	const Promise = require('bluebird');
	Promise.promisifyAll(mongoose);

	return mongoose.model('Enterprise', _schema);
}