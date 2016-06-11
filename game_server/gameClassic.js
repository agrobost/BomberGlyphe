"use strict";
var Personnage = require("./personnage.js");

var gameClassic = function(io, refGame){

	var io = io;
	var refGame = refGame;
	this.players = {};
	this.env = createEnvironment();
	var that = this;
	
	this.addPlayer = function(user){
		if(Object.keys(this.players).length > 6){
			return false;
		}
		user.getSocket().join(refGame);
		user.getSocket().emit("server sends game env to client", this.env);
		user.game = that;
 
		this.players[user.getSocket().id] = new Personnage(user, io, refGame, that);		

		for(var id in this.players){
			user.getSocket().emit("initialize champion", this.players[id].toObject());
		}
		user.getSocket().broadcast.to(refGame).emit('initialize champion', this.players[user.getSocket().id].toObject());		

		return true;
	};

	this.deletePlayer = function(idSocket){
		this.players[idSocket].stopInterval();
		delete this.players[idSocket];
		io.sockets.in(refGame).emit('a player disconnects', idSocket);	
	};



	function createEnvironment(){
		var i, j;
		var map = [];
		var numberColumn = 30;
		var numberLine = 8;
		var sizeCell = 65;

		for(i=0;i<numberColumn;i++){
			map[i] = [];
			for(j=0;j<numberLine;j++){
				var random = Math.random();
				if(random<0.33/4){
					map[i][j] = 2;
				}else if(random<0.66/4){
					map[i][j] = 3;
				}else{
					map[i][j] = 0;
				}
			}
		}
		map[5][3] = 0;
		return {map:map,numberColumn:numberColumn, numberLine:numberLine, sizeCell:sizeCell};
	};


};

module.exports = gameClassic;