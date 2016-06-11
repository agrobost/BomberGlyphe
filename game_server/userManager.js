"use strict";
var User = require("./user.js");
var userManager = function(sio, gm){
	
	var io = sio;
	var gameManager = gm;
	var users = {};

	this.addUser = function(socket, pseudo){
		users[socket.id] = new User(socket, pseudo, gm);	
	};

	this.deleteUser = function(idSocket){
		users[idSocket].disconnect();
		delete users[idSocket];
		console.log("Un utilisateur viens de se déconnecter");
	};

	this.getUser = function(idSocket){
		return users[idSocket];
	};
};


module.exports = userManager;