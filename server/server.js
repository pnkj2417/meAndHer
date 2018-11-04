var express             =require('express');
var app                  =express();
const socketIO          =require('socket.io');
const http              =require('http');
const {generateMsg}     =require('./utils/message');

const path=require('path');
const publicPath=path.join(__dirname,"../public");
const port= process.env.PORT || 3000;
app.use(express.static(publicPath));

var server=http.createServer(app);
app.get('/',function(req,res){
    app.render('index');
});

var io=socketIO(server);
io.on('connection',(socket)=>{
    //code to run as new user connected..
    console.log("new user connected");
    socket.on('disconnect',function(){
        console.log("user was disconnected..");
    });

    //hello from admin
    socket.emit('newMsg',generateMsg('Admin','Welcome to your kingdom'));
    //notify to admin ...new user joined
    socket.broadcast.emit('newMsg',generateMsg('Admin','Soldier is available for service'));
    
    socket.on('createMsg',function(msg){
        console.log(msg.text);
        // io.emit('newMsg',{
        //     from:msg.from,
        //     text:msg.text,
        // createdAt:new Date().getTime()
        // });
        socket.broadcast.emit('newMsg',generateMsg(msg.from,msg.text));
    });
});



server.listen(port,()=>{
    console.log("server started");
});