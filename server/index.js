 const express = require("express");
 const app = express();
 const http = require("http");
 const cors = require("cors");
 const { Server } = require("socket.io")

 app.use(cors());
  
 const server = http.createServer(app);
 
 const io = new Server( server , {
     cors : {
         origin : "https://65d079ea3a6c786107c32a1a--delightful-babka-a40ea7.netlify.app" ,
         methods : ["GET" , "POST"] ,
     } ,
 } )

 io.on("connection" , (socket) => {
     console.log( "socket-id" , socket.id);

     socket.on("join_room" , (data) => {
        socket.join(data);
        console.log('user with id' , socket.id , 'joined the room' , data );
    }) 
     
    socket.on("send_message" , (data) => {
       socket.to(data.room).emit("receive_message" , data);
    }) 
       

     socket.on("disconnect" , () => {
         console.log("user is Disconnected from the server" , socket.id);
     })
 })

 server.listen(3001 , () => {
    console.log("server is runnig");   
 })
