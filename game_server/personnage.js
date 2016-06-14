"use strict";
var MovementCharacter = require("./movementCharacter.js");


var personnage = function(user, sio, refGame, gameClassic){

	this.io  = sio;
	this.user = user;
	this.refGame = refGame;
	this.gameClassic = gameClassic;
	this.health = {current:1000,max:2500, regeneration:45};
	this.mana = {current:350,max:800, regeneration:30};
	this.speed = 0.175;
	this.position = {x:(32.5+65*5),y:(32.5+65*3)};
	this.orientation = 40; //bot
	this.deplacement = new MovementCharacter(this);
	this.bomb = {};

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
		return {id:that.user.socket.id,health:that.health, mana:that.mana, speed:that.speed, position:that.position};
	};

	this.user.socket.on("space down", function(){
		bombManager.dropBomb(that);
	});

	this.getCell = function(){
		return {x:Math.round((this.position.x-env.sizeCell/2)/env.sizeCell),y:Math.round((this.position.y-env.sizeCell/2)/env.sizeCell)};
	}
};

module.exports = personnage;