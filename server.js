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

socket.on("chat:send",(text) =>{
    io.emit("chat:message", (text));

});

socket.on("disconnect", () =>{console.log ("User disconnected:", socket.id);

})});

server.listen(3000, () => { console.log("Server running at http://localhost:3000");

    
})