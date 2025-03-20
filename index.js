const express = require("express");
const app = new express();

const http = require("http");
const expressServer = http.createServer(app);




const { Server } = require("socket.io");
const io = new Server(expressServer);



io.on("connection", function (socket) {
  console.log("New user connected");

  socket.on('myEvent',function(msg){
    console.log(msg);
  });

  socket.on('disconnect',function(){
    console.log('user disconnected');
  });

});









app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, function () {
  console.log("Server is run http://localhost:3000");
});
