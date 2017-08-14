const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validations.js');
var {Users} = require('./utils/users.js');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New user connected');



  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined chat`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (locationMessage) => {
    socket.broadcast.emit('newLocationMessage', generateLocationMessage('Admin', locationMessage.latitude, locationMessage.longitude));
  })

  socket.on('disconnect', () => {
    var user = Users.removeUser(socket.id);

    if(user) {
      socket.broadcast.to(user.room).emit('updateUserList', Users.getUserList(user.room));
      socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left chat`));
    };

  });
});

server.listen(port, ()=> {
  console.log('server started at port ' + port);
});
