var socket = io();

function scrollToBottom() {
  //Selector
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heihgt
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }


}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    };
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user.name));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mma');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (locationMessage) {
  var formattedTime = moment(locationMessage.createdAt).format('h:mma');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: locationMessage.url,
    from: locationMessage.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // var formattedTime = moment(locationMessage.createdAt).format('h:mma');
  //
  // li.text(`${locationMessage.from} ${formattedTime}: `);
  // a.attr('href', locationMessage.url);
  // li.append(a);
  // jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
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
