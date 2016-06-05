"use strict";

var personnage = function(user, sio, refGame, gameClassic){

	var io  = sio;
	var user = user;
	var refGame = refGame;
	var gameClassic = gameClassic;

	var vie = 1000;
	var mana = 300;
	var speed = 0.175;
	var position = {x:(32.5+65*5),y:(32.5+65*3)};
	var direction;
	var spells = [];

	user.getSocket().on("position", function(data){
		position = data.position;
		direction = data.direction;
		io.sockets.in(refGame).emit("position", {id:user.getSocket().id,position:position,direction:direction, speed:speed}); 		
	});

	this.toObject = function(){
		return {id:user.getSocket().id,vie:vie, mana:mana, speed:speed, position:position};
	}

	user.getSocket().on("space down", function(data){
		var cell = {x:Math.round((position.x-gameClassic.env.sizeCell/2)/gameClassic.env.sizeCell),y:Math.round((position.y-gameClassic.env.sizeCell/2)/gameClassic.env.sizeCell)};
		gameClassic.env.map[cell.x][cell.y] = 4;
		io.sockets.in(refGame).emit("space down", {i:cell.x, j:cell.y, value:gameClassic.env.map[cell.x][cell.y]}); 	
	})


};

module.exports = personnage;