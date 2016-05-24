"use strict";

var user = function(socket){

	var position = {x:800,y:800};
	var direction = -1;
	var socket = socket;
	var lastTimestamp = 0;
	var time = 0;
	var speed = 0.500;//pixel par milli seconde ici 100 pixel par seconde
	setInterval(function(){
		time = Date.now()-lastTimestamp;
		switch(direction){
			case 0:
				position.x-=speed*time;
			break;

			case 1:
				position.y-=speed*time;
			break;

			case 2:
				position.x+=speed*time;
			break;

			case 3:
				position.y+=speed*time;
			break;

			default:
				time = 0;
				lastTimestamp = 0;
			break;
		}
		lastTimestamp = Date.now();
		socket.emit("position direction",{position:position,direction:direction});
	},30);

	this.setDirection = function(d){
		direction = d;
	};
};

module.exports = user;