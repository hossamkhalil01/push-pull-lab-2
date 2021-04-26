const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 8000;
const app = express();

const server = app.listen(PORT, function () {
  console.log("Listening on port 8000");
});

// Socket setup
const io = socket(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

const socketsArr = [];

io.on("connection", (socket) => {
  socket.emit("socketsList", socketsArr);

  socketsArr.push(socket.id);

  // broadcast joining updates
  socket.broadcast.emit("socketsList", socketsArr);

  // remove socket from array
  socket.on("disconnect", () => {
    const index = socketsArr.indexOf(socket.id);
    socketsArr.splice(index, 1);
    socket.broadcast.emit("socketsList", socketsArr);
  });

  // Broadcast
  socket.on("messageToAll", (message) => {
    socket.broadcast.emit("broadcast", message);
  });

  // send to user
  socket.on("messageToUser", (data) => {
    io.to(data.socketId).emit("privateMessage", data.message);
  });

  // subscribe a room
  socket.on("subscribeToRoom", (room) => {
    socket.join(room);
  });

  // send to room
  socket.on("messageToRoom", (data) => {
    socket.to(data.group).emit("groupMessage", data.message);
  });
});
