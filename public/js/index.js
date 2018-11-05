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

// socket.emit('createMsg',{
//     from:'Queen',
//     text:'Whatever'
// },function(data){
// console.log(data + "got it");
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMsg',{
        from:'Soldier',
        text:jQuery('[name=message]').val()
    },function(){
    
    });


});