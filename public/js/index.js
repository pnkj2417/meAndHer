var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');


});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
  console.log( msg.text);
  console.log( msg.createdAt);
  var li=jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMsg',function(message){
    var li =jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(a);
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMsg',{
        from:'Soldier',
        text:jQuery('[name=message]').val()
    },function(){
    
    });

});

var locationButton =jQuery('#send-location');
locationButton.on('click',function(){
if(!navigator.geolocation){
    return alert('geolocation not supported by browser.')
}
navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
    });
},function(){
    alert('Unable o fetch location.');
});
});