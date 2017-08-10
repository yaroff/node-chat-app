const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'Me',
    text: 'Test text'
  });

  socket.emit('newMessage', {
    from: 'User2',
    text: 'Test text!',
    createdAt: new Date().getTime()
  });

  socket.on('createEmail', (email) => {
    console.log(email);
  });

  socket.on('createMessage', (message) => {
    message.createdAt = new Date().getTime();
    console.log(message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, ()=> {
  console.log('server started at port ' + port);
});
