"use strict";

var user = function(socket, pseudo, gm){
	
	var gameManager = gm;
	var pseudo = pseudo;
	var socket = socket;
	var that = this;

	socket.on('client want find a classic game', function(){
		gameManager.joinClassicGame(that);
	});

	this.getSocket = function(){
		return socket;
	};
	this.getPseudo = function(){
		return pseudo;
	};
};

module.exports = user;