var express             =require('express');
var app                  =express();
const socketIO          =require('socket.io');
const http              =require('http');
const {generateMsg,generateLocationMsg}     =require('./utils/message');
const{isRealString}=require('./utils/validation');
const{Users}=require('./utils/users');

const path=require('path');
const publicPath=path.join(__dirname,"../public");
const port= process.env.PORT || 3000;
app.use(express.static(publicPath));
var users=new Users();

var server=http.createServer(app);
app.get('/',function(req,res){
    app.render('index');
});


var io=socketIO(server);
io.on('connection',(socket)=>{
    
    //code to run as new user connected..
    //console.log("new user connected");
    socket.on('disconnect',function(){
        //console.log("user was disconnected..");
        var user=users.removeUser(socket.id);
  if(user)
  {
     // console.log("jlnlknldam");
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMsg',generateMsg('Admin',`${user.name} has left`));
  }
    });


    

   socket.on('join',function(params,callback){
if(!isRealString(params.name)|| !isRealString(params.room) ||!(params.name=="Doxab" || params.name=="Compounder"))
{
    return callback('Invalid details ...')
}

socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id,params.name,params.room);
io.to(params.room).emit('updateUserList',users.getUserList(params.room));
if(params.name=="Doxab")
{
    socket.emit('newMsg',generateMsg('Compounder','Welcome ,Doxab !!'));

}
else
       socket.emit('newMsg',generateMsg('Admin','Welcome !!'));
       
callback();
   });
    
    socket.on('createMsg',function(msg,callback){
       var user=users.getUser(socket.id);
       if(user && isRealString(msg.text))
       {
           io.to(user.room).emit('newMsg',generateMsg(user.name,msg.text));
       }
       
        callback();
    });

    socket.on('createLocationMessage',function(coords){
        var user=users.getUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('newLocationMsg',generateLocationMsg(user.name,coords.latitude,coords.longitude));
        }
        
    })
});




server.listen(port,()=>{
    console.log("server started");
});