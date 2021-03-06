var socket = io();

function scrollToBottom() {
  // selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error')
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

socket.on('updateUserList', function(users) {
  var ol = $('<ol></ol>');
  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    createdAt: formattedTime
  });

  scrollToBottom();

  $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  scrollToBottom();

  $('#messages').append(html);
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
