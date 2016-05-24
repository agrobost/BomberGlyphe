"use strict";
var User = require("./user.js");
var userManager = function(){
	
	var users = {};

	this.addUser = function(socket){
		users[socket] = new User(socket);
		console.log("Un utilisateur viens de se connecter");
	};

	this.deleteUser = function(socket){
		delete users[socket];
		console.log("Un utilisateur viens de se déconnecter");
	};

	this.getUser = function(socket){
		return users[socket];
	};
};


module.exports = new userManager();