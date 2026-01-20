const path = require("path");
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


//serve the HTML file at/
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));});

//when a browser connects via Socket.io

io.on("connection", (socket) => { console.log("User connected: ", socket.id);

//to do - listen for chat:send / broadcast chat: message

socket.on("diconnect", () =>{ console.log ("User disconnectd:", socket.id);

})});

server.listen(3000, () => { console.log("Server running at http://localhost:3000");

    
})