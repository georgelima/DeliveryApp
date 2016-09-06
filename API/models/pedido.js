'use strict'

module.exports = function(app) {
  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  let _schema = Schema({
	  'idUser': String,
    'enterprise': { type: Schema.Types.ObjectId, ref: 'Enterprise' }, 
    'items': [], 
    'address': {} , 
    'status': { type: String, default:'Processando' }, 
    'totalPrice': Number, 
    'createdAt': { type: Date, default: Date.now } 
	});

  return mongoose.model('Order', _schema);
}
