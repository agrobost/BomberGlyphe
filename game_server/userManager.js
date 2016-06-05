"use strict";
var User = require("./user.js");
var userManager = function(sio, gm){
	
	var io = sio;
	var gameManager = gm;
	var users = {};

	this.addUser = function(socket, pseudo){
		users[socket] = new User(socket, pseudo, gm);	
	};

	this.deleteUser = function(socket){
		delete users[socket];
		console.log("Un utilisateur viens de se déconnecter");
	};

	this.getUser = function(socket){
		return users[socket];
	};
};


module.exports = userManager;