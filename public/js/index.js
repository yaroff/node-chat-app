var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message');
  console.log(message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (locationMessage) {
  console.log(locationMessage);

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${locationMessage.from}: `);
  a.attr('href', locationMessage.url);
  li.append(a);
  jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'Frank',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });

});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (e) {
  e.preventDefault();

  if ("geolocation" in navigator) {
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location!')
      });
    });
  } else {
    return alert('No geolocation available');
  }
});
