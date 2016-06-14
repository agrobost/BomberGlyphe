"use strict";
var Personnage = require("./personnage.js");
var BombManager = require("./bombManager.js");
var Environment = require("./environment.js");

var gameClassic = function(io, refGame){

	var io = io;
	var refGame = refGame;
	this.players = {};
	this.env = new Environment();
	this.bombManager = new BombManager();
	this.timerPing;
	var that = this;
	
	this.addPlayer = function(user){
		if(Object.keys(this.players).length > 6){
			return false;
		}
		user.socket.join(refGame);

		this.env.emitTo(user);

		user.game = that;

		this.players[user.socket.id] = new Personnage(user, io, refGame, that);		

		for(var id in this.players){
			user.socket.emit("initialize champion", this.players[id].toObject());
		}
		user.socket.broadcast.to(refGame).emit('initialize champion', this.players[user.socket.id].toObject());


		this.timerPing = setInterval(function(){
			user.pinguer();
			user.socket.emit("pinguage");
		},1000);

		user.socket.on("ponguage", function(fps){
			user.ponguer();
			user.fps = fps;
			io.sockets.in(refGame).emit('ping fps', {fps:user.fps,ping:user.ping});
		});

		return true;
	};

	this.deletePlayer = function(idSocket){
		clearInterval(this.timerPing);
		this.players[idSocket].stopInterval();
		delete this.players[idSocket];
		io.sockets.in(refGame).emit('a player disconnects', idSocket);	
	};



};

module.exports = gameClassic;