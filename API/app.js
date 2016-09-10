'use strict'

const app = require('./config/express')();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

const ip  = require('ip');

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
app.set('ip', ip.address());

require('./config/db')('mongodb://' + app.get('ip') + '/phbdelivery');

http.listen(app.get('port'), app.get('ip'), () => console.log("Server rodando!"))