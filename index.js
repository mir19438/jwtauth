const express = require("express");
const app = new express();

const http = require("http");
const expressServer = http.createServer(app);


const { Server } = require("socket.io");
const io = new Server(expressServer);



io.on("connection", function (socket) {
  
  socket.on('chat',function(msg){
    io.emit('chat_transfer',msg);
  });


});




app.get("/", function (req, res) {
  res.sendFile(__dirname + "/chatapp.html");
});

expressServer.listen(3000, function () {
  console.log("Server is run http://localhost:3000");
});
