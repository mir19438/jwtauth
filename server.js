const express = require("express");
const app = new express();

const http = require("http");
const expressServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", function (socket) {
  console.log("New user connected");

    socket.on('myevent',function(msg){
        console.log(msg);
    });


  //   setTimeout(() => {
  //     let d = new Date();
  //     let t = d.getTime();
  //     socket.send(t + " " + "server to client");
  //   }, 10000);

//   setInterval(() => {
//     let d = new Date();
//     let t = d.getTime();
//     socket.emit('myevent',t + " " + "server to client");
//   }, 10);

  socket.on("disconnect", function () {
    console.log("User disconnected");
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client.html");
});

expressServer.listen(3000, function () {
  console.log("Server is http://localhost:3000");
});
