"use strict";

var user = function(socket, pseudo, gm){
	
	var gameManager = gm;
	var pseudo = pseudo;
	var socket = socket;
	var that = this;
	this.game;

	socket.on('client want find a classic game', function(){
		gameManager.joinClassicGame(that);
	});

	this.getSocket = function(){
		return socket;
	};
	this.getPseudo = function(){
		return pseudo;
	};
	this.disconnect = function(){
		if(this.game != undefined){
			this.game.deletePlayer(socket.id);
		}
	}
};

module.exports = user;
