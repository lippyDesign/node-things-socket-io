var socket = io();

socket.on('connect', function() {
  console.log('Connected to server')
});

socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  const li = $('<li></li>');
  li.text(message.from + ': ' + message.text);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('')
  });
})

const locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser');

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send Location');
  }, function() {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send Location');
  });
})
