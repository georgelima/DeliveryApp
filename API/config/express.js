'use strict'

module.exports = function(){
	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser');
	const load = require('express-load');
	const compression = require('compression');
	const helmet = require('helmet');
	const sanitize = require('express-mongo-sanitize');

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(sanitize());
	app.use(compression());
	app.use(helmet());
	
	load('models').then('controllers').then('routes').into(app);

	app.set('port', 3000);

	return app;
}


