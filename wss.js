const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

let socketsConnected = new Set();

io.on('connection', (socket) => {

  onConncted(socket);

  //  Total number of clients connected


  io.emit('client-total', socketsConnected.size);

  socket.on('disconnect', () => { onDisconnected(socket); });

  socket.on('message', (data) => {
    const clientIp = socket.handshake.address;
    data.ip = clientIp;
    // console.log('Message received on server:', data);
   socket.broadcast.emit('message', data);

  });

  socket.on('image', (data) => {
    const clientIp = socket.handshake.address;
    data.ip = clientIp;
    socket.broadcast.emit('image', data);
  });

  socket.on('notyping', (data) => {
    // console.log('Typing received on server:', data);
    socket.broadcast.emit('notyping', true);
  })

  socket.on('feedback', (data) => {
    // console.log('Feedback received on server:', data);
    socket.broadcast.emit('feedback', `${data} is Typing ...`);
  })

});

function onConncted(socket) {
  console.log(socket.id + ' connected');
  socketsConnected.add(socket.id);
}

function onDisconnected(socket) {
  console.log(socket.id + ' disconnected');
  socketsConnected.delete(socket.id);
  io.emit('client-total', socketsConnected.size);
}
