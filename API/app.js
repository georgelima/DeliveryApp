'use strict'

const app = require('./config/express')();
const http = require('http').createServer(app);

require('./config/db')('mongodb://127.0.0.1/phbdelivery');

http.listen(app.get('port'), () => console.log("Server rodando!"))