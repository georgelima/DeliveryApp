'use strict'

module.exports = function(url){
	const mongoose = require('mongoose');
	mongoose.Promise = global.Promise;

	mongoose.connection.on('connected', () => {
		console.log('MongoDB connected!');
	});

	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB disconnected!');
	});	

	mongoose.connection.on('error', (err) => {
		console.log('MongoDB ERROR: ' + err);
	});


	let gracefulExit = function() { 
	  mongoose.connection.close(function () {
	    console.log('Mongoose default connection with DB was disconnected through app termination');
	    process.exit(0);
	  });
	}

	process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

	try {
		mongoose.connect(url);
	}catch(err){
		console.log('MongoDB connection failed: ' + err);
	}
}