
const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const errorHandler = require('./middlewares/errorHandler')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const authentication = require('./middlewares/authentication')
const router = require('./routers')
const Controller = require('./controllers/Controller')

app.use(cors())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  // socket.emit("welcome", "Hello Mr/Mrs " + socket.id) // emit ke client yg lagi connect

  //chat
  if (socket.handshake.auth.username) {
    console.log('username : ' + socket.handshake.auth.username);
  }

  socket.on("message:new", (message) => {
    // io.emit("message:update", {
    //   from: socket.handshake.auth.username,
    //   // id: socket.id,
    //   message
    // })
    socket.broadcast.emit("refresh chat")
  })
});


// app.post("/login", UserController.login)
app.use(router)
app.use(authentication)


app.use(errorHandler)




server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
