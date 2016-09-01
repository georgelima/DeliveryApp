'use strict'

module.exports = function (app){
	const mongoose = require('mongoose');
	let _schema = new mongoose.Schema({
		'name': String,
		'picture': String,
		'address': {
			'street': String,
			'number': {
				'type': String,
				'default': 'S/N'
			},
			'neighborhood': String,
			'city': String
		},
		'menu':[{
			'name': String, 'price': Number, 'description': String, 'type': String
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