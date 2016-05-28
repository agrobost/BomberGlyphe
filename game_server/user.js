"use strict";

var user = function(socket){

	var position = {x:800,y:800};
	var direction = -1;
	var socket = socket;
	var lastTimestamp = 0;
	var time = 0;
	var speed = 0.200;//pixel par milli seconde ici 100 pixel par seconde
	
	socket.on("position", function(data){
		setTimeout(function(){ 
			socket.emit("position", data); 
		}, 50);
		
	});

	this.setDirection = function(d){
		direction = d;
	};
};

module.exports = user;