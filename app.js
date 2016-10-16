var express = require('express');
var socket_io = require("socket.io");
var path = require('path');
var logger = require('morgan');
var routes = require('./routes/index');
var app = express();
var io = socket_io();
app.io = io;
var GameManager = require("./game_server/gameManager.js");
var UserManager = require("./game_server/userManager.js");
var gameManager = new GameManager(io);
var userManager = new UserManager(io, gameManager);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

io.on("connection", function(socket){
    "use strict";
    socket.on("client sends pseudo to server", function(pseudo){
        userManager.addUser(socket, pseudo);
    });
    socket.on('disconnect', function(){
        console.log("Le client est déconnecté");
        userManager.deleteUser(socket.id);
    });
});

module.exports = app;
