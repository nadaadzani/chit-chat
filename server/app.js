const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const authentication = require("./middlewares/authentication");
const router = require("./routers");
const Controller = require("./controllers/Controller");

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === localStorage.username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

 const getUser = (username) => {
  return onlineUsers.find((user)=> user.username === username)
 }


io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  console.log(socket);
  // socket.emit("welcome", "Hello Mr/Mrs " + socket.id) // emit ke client yg lagi connect

  //chat
  if (socket.handshake.auth.username) {
    console.log("username : " + socket.handshake.auth.username);
  }

  socket.on("message:new", (message) => {
    // io.emit("message:update", {
    //   from: socket.handshake.auth.username,
    //   // id: socket.id,
    //   message
    // })
    socket.broadcast.emit("refresh chat");
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
    });
  });
});

// app.post("/login", UserController.login)
app.use(router);
app.use(authentication);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
