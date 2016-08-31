var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/home/george/cert.key').toString(),
  cert: fs.readFileSync('/home/george/cert.crt').toString()
};

// Create a service (the app object is just a callback).
var app = express();

app.get('/', (req, res) => res.send("Ola"));

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(3000);