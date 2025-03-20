const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = {};
const groups = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  users[userId] = socket.id;
  console.log("socket is", socket.id, "user id ", userId);
  console.log(users); // console.log(`User connected: ${socket.id}`); // 'login' event with socket ID // socket.on("login", ({ userId }) => { //     users[userId] = socket.id; //     console.log(`User logged in: ${userId}`); //     io.emit("login", userId); // }); // private messages
  socket.on("private-message", ({ receiverId, message, created_at }) => {
    const senderId = socket.id;
    console.log(
      `Sending private message from ${userId} to ${receiverId}: ${message}`
    ); // Check if the receiver is online

    if (users[receiverId]) {
      io.to(users[receiverId]).emit("private-message", {
        receiver_id: receiverId,
        sender_id: userId,
        message,
        created_at,
      }); // io.to(senderId).emit("private-message", { //     senderId, //     message, // });
    } else {
      console.log(`User ${receiverId} not found or offline.`);
    }
  }); // Handle user disconnection and clean up
  socket.on("disconnect", () => {
    // console.log(`User disconnected: ${socket.id}`);
    // Clean up user from the users object
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        break;
      }
    } // console.log("Current users:", users);
  });
});


server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000");
});
