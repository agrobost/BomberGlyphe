"use strict";
var Personnage = require("./personnage.js");

var gameClassic = function(io, refGame){

	var filled = false;
	var io = io;
	var refGame = refGame;
	var players = {};
	this.env = createEnvironment();
	var that = this;
	
	this.addPlayer = function(user){
		user.getSocket().emit("server sends game env to client", this.env);
 
		players[user.getSocket().id] = new Personnage(user, io, refGame, that);		

		for(var id in players){
			user.getSocket().emit("initialize champion", players[id].toObject());
		}
		user.getSocket().broadcast.to(refGame).emit('initialize champion', players[user.getSocket().id].toObject());		

		user.getSocket().on('disconnect', function(){
			delete players[user.getSocket().id];
			io.sockets.in(refGame).emit('a player disconnects', user.getSocket().id);	
		});

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
	this.isFilled = function(){
		return filled;
	}

};

module.exports = gameClassic;