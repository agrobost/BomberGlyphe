"use strict";
var MovementCharacter = require("./movementCharacter.js");


var character = function(user, sio, refGame, gameClassic, positionHtml){

	this.io  = sio;
	this.user = user;
	this.refGame = refGame;
	this.gameClassic = gameClassic;
	this.health = {current:1000,max:2500, regeneration:45};
	this.mana = {current:350,max:800, regeneration:30};
	this.speed = 0.100;
	this.position = {x:(30+60*5),y:(30+60*3)};
	this.orientation = 40; //bot
	this.deplacement = new MovementCharacter(this);
	this.bomb = {};
	this.positionHtml = positionHtml;
	this.nbMaxBomb = 1;
	this.nbCurrentBomb = 0;
	this.powder = 2;

	var that = this;
	var env = this.gameClassic.env;
	var bombManager = this.gameClassic.bombManager;

	var timer = setInterval(function(){
		var someHealth = that.health.regeneration * 200 / 1000;
		var someMana = that.mana.regeneration * 200 / 1000;

		if(that.health.current + someHealth > that.health.max){
			that.health.current = that.health.max;
		}else{
			that.health.current += someHealth;
		}
		if(that.mana.current + someMana > that.mana.max){
			that.mana.current = that.mana.max;
		}else{
			that.mana.current += someMana;
		}

		that.io.sockets.in(that.refGame).emit('update champion',{id:that.user.socket.id,health:that.health,mana:that.mana});
	},200);

	this.stopInterval = function(){
		clearInterval(timer);
		this.deplacement.stopInterval();
	};

	this.toObject = function(){
		return {id:that.user.socket.id,health:that.health, mana:that.mana, speed:that.speed, position:that.position, positionHtml:that.positionHtml, pseudo:that.user.pseudo};
	};

	this.user.socket.on("space down", function(){
		bombManager.dropBomb(that);
	});

	this.getCell = function(){
		return {x:Math.round((this.position.x-env.sizeCell/2)/env.sizeCell),y:Math.round((this.position.y-env.sizeCell/2)/env.sizeCell)};
	};
	this.checkBonus = function(){
		var cell = this.getCell();
		switch(this.gameClassic.env.map[cell.x][cell.y]["type"]){
			case "bonusPowder": 
			if(that.powder>=5){
				resetCell();
				break;
			}
			that.powder++;
			resetCell();
			break;

			case "bonusSpeed": 
			if(that.speed>=0.300){
				resetCell();
				break;
			}
			that.speed += 0.100;
			that.io.sockets.in(that.refGame).emit('update champion',{id:that.user.socket.id,speed:that.speed});
			resetCell();
			break;

			case "bonusBomb": 
			that.nbMaxBomb++;
			resetCell();
			break;
		}
		function resetCell(){
			that.gameClassic.env.map[cell.x][cell.y]["type"] = "empty";
			that.io.sockets.in(that.refGame).emit("modify cell", {i:cell.x, j:cell.y, value:env.map[cell.x][cell.y]});	
		}

	};
};

module.exports = character;