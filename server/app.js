const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = 3000
const router = require("./routers/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

io.on("connection", (socket) => {
    // ...
    console.log(socket.id)
});

app.use(router)
app.use(errorHandler)

// app.listen(port, () => {
//     console.log('yow bang')
// })

httpServer.listen(port, () => {
    console.log('http://localhost:3000')
});