'use strict'

const assert = require('assert');
const http = require('http');

let configGetAll = {
  hostname: 'localhost', 
  port: 3000,
  path: '/api/enterprise/' 
}

let configGetOne = {
  hostname: 'localhost', 
  port: 3000,
  path: '/api/enterprise/57c79e0d998c76de40af9d5d' 
}

let configGetOneUnknown = {
  hostname: 'localhost', 
  port: 3000,
  path: '/api/enterprise/57c79e0d998c76af9d5d' 
}

describe('EstabelecimentoController', function() {
  it('#get /api/enterprise', function(done) {
    http.get(configGetAll, (res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
      done();
    });
  });

  it('#get /api/enterprise/id', function(done) {
    http.get(configGetOne, (res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
      done();
    });
  });

   it('#get /api/enterprise/id unkown user', function(done) {
    http.get(configGetOneUnknown, (res) => {
      assert.equal(res.statusCode, 404);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
      done();
    });
  });

  it('#get /api/enterprise/id unkown user', function(done) {
    http.get(configGetOneUnknown, (res) => {
      assert.equal(res.statusCode, 404);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
      done();
    });
  });


});