'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const load = require('express-load');
const compression = require('compression');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const expressValidator = require('express-validator');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(cors());
app.use(sanitize());
app.use(compression());
app.use(helmet());


load('models').then('controllers').then('routes').into(app);

app.set('port', 3000);

module.exports = function(){
	return app;
}


