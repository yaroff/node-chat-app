const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message.js');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat'));

  socket.on('createMessage', (message) => {
    console.log('create message:', message);

    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage', (locationMessage) => {
    socket.broadcast.emit('newLocationMessage', generateLocationMessage('Admin', locationMessage.latitude, locationMessage.longitude));
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, ()=> {
  console.log('server started at port ' + port);
});
