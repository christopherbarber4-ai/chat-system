const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static("public"));
let userList = [];


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connect", (socket) => {


    console.log("User connected: ", socket.id);
    userList.push(socket.id);
    io.emit("newUser", socket.id, userList);





    socket.on("nameUpdate", (nameEntered) => {
        io.emit("messageSend", ("You are now known as: " + nameEntered));
        socket.username = nameEntered;


    });

    socket.on("numUpdate", (numEntered) => {
        io.emit("messageSend", ("You rolled a " + numEntered));
        socket.roll = numEntered;
    });



    socket.on("messageSend", (text) => {
        io.emit("messageSend", (socket.username + " says " + text));

    });


    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
        userList.pop(socket.id);
        io.emit("disconnected",socket.id, userList);
    })
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");


})