"use strict";
var MovementCharacter = require("./movementCharacter.js");

var personnage = function(user, sio, refGame, gameClassic){

	this.io  = sio;
	this.user = user;
	this.refGame = refGame;
	this.gameClassic = gameClassic;

	var health = {current:1000,max:2500, regeneration:45};
	var mana = {current:350,max:800, regeneration:30};
	this.speed = 0.175;
	this.position = {x:(32.5+65*5),y:(32.5+65*3)};
	this.orientation = 40; //bot
	

	this.deplacement = new MovementCharacter(this);
	var that = this;





	var timer = setInterval(function(){

		var someHealth = health.regeneration * 200 / 1000;
		var someMana = mana.regeneration * 200 / 1000;

		if(health.current + someHealth > health.max){
			health.current = health.max;
		}else{
			health.current += someHealth;
		}
		if(mana.current + someMana > mana.max){
			mana.current = mana.max;
		}else{
			mana.current += someMana;
		}

		that.io.sockets.in(that.refGame).emit('update champion',{id:that.user.getSocket().id,health:health,mana:mana});
	},200);

	this.stopInterval = function(){
		clearInterval(timer);
	}

	this.toObject = function(){
		return {id:this.user.getSocket().id,health:health, mana:mana, speed:this.speed, position:this.position};
	}

	this.user.getSocket().on("space down", function(data){
		if(mana.current < 200){
			return;
		}
		mana.current -= 200;
		var cell = {x:Math.round((that.position.x-this.gameClassic.env.sizeCell/2)/this.gameClassic.env.sizeCell),y:Math.round((that.position.y-this.gameClassic.env.sizeCell/2)/this.gameClassic.env.sizeCell)};
	
		this.gameClassic.env.map[cell.x][cell.y] = 4;
		that.io.sockets.in(that.refGame).emit("space down", {i:cell.x, j:cell.y, value:this.gameClassic.env.map[cell.x][cell.y]}); 	
	})


};

module.exports = personnage;