const http = require("http");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
const SocketManager = require("./models/SocketManager");

const server = http.createServer(app);

const io = require('socket.io')(server);

app.get("/",(req,res)=>{
    res.json({msg:"Hello world"})
});

//pass the io
SocketManager(io);

server.listen(PORT,()=>{
    console.log(`Server is listening to Port ${PORT}`);
});

module.exports = app;