var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'yatat@example.com',
    text: 'Ureire'
  });

  socket.emit('createMessage', {
    from: 'Username1',
    text: 'Hello world!'
  });
  
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('New email');
  console.log(email);
})

socket.on('newMessage', function (message) {
  console.log('New message');
  console.log(message);
})
