// const RestProxy = require('sp-rest-proxy');  
// const settings = {  
//     port: 8080, // Local server port  
// };  
// const restProxy = new RestProxy(settings);  
// restProxy.serve(); 

// var express = require('express');
// var socket = require('socket.io');

// //====App setup =======
// var app = express();
// var server = app.listen(3000, function(){
//     console.log("listening for request on port 3000");
// })

// //====socket set up========
// var io = socket(server);

// //listen for new connection and print a message in console
// io.on('connection', (socket) => {
//     console.log(`New connection ${socket.id}`);
    
//     socket.on('chat', function(data){
//         io.sockets.emit('chat', data);
//     });

//     socket.on('typing', function(data){
//         io.sockets.emit('tying', data);
//     });
// })

//==========as per youtube: Angular Socket.IO Tutorial=========

let app = require('express')();
let http = require('http').Server(app);
var io = require('socket.io')(http);

//listen for new connection and print a message in console
io.on('connection', (socket) => {
    //=log whenever a user connects ===
    console.log('New user connected');
    
    //=log whenever a user disconnects ===
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });    
});

http.listen(5000, ()=>{
    console.log('started on port 5000');
})

// const express = require('express');
// const path = require('path');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/dashboard/index.html'));
// });

// const server = http.createServer(app);

// const io = socketIO(server);

// let numberOfOnlineUsers = 0;

// io.on('connection', (socket) => {
//     numberOfOnlineUsers++;
//     io.emit('numberOfOnlineUsers', numberOfOnlineUsers);

//     console.log('New user connected');

//     socket.on('disconnect', () => {
//         numberOfOnlineUsers--;
//         io.emit('numberOfOnlineUsers', numberOfOnlineUsers);
//         console.log('User disconnected');
//     });
// });


// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });