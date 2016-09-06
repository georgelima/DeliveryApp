'use strict'

const app = require('./config/express')();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

let usersOnline = 0;

io.on('connection', (socket) => {
  io.sockets.emit('conn', 'Conectado!');
  usersOnline++;
  // console.log('Usuarios: ', usersOnline);

  socket.on('disconnect', (socket) => {
    usersOnline--;
    // console.log('Usuarios: ', usersOnline);
  });

});

app.set('io', io);

require('./config/db')('mongodb://192.168.1.2/phbdelivery');

http.listen(app.get('port'), '192.168.1.2', () => console.log("Server rodando!"))