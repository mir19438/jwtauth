const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("একজন ইউজার সংযুক্ত হয়েছে:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("ক্লায়েন্ট থেকে ডাটা এসেছে:", data);
    socket.emit("receiveMessage", { message: "Server থেকে রিপ্লাই!", data });
  });

  socket.on("disconnect", () => {
    console.log("একজন ইউজার সংযোগ বিচ্ছিন্ন করেছে");
  });
});

// API Route
app.get("/send-data", (req, res) => {
  const { message } = req.body;
  io.emit("receiveMessage", { message });
  res.json({ status: "success", message: "Message sent to all clients" });
});

// Server Run
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server চলছে: http://localhost:${PORT}`);
});
