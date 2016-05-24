"use strict";

var user = function(socket){

	var position = {x:800,y:800};
	var direction = -1;
	var socket = socket;
	var lastTimestamp = 0;
	var time = 0;
	var speed = 0.200;//pixel par milli seconde ici 100 pixel par seconde
	setInterval(function(){
		time = Date.now()-lastTimestamp;
		switch(direction){
			case 0:
				if(Number.isInteger(position.y/60)){
					position.x-=speed*time;
				}else{
					if(position.y/60>Math.round(position.y/60)){
						
						if((position.y-speed*time)/60<=Math.round(position.y/60)){
							position.y = Math.round(position.y/60)*60;
						}else{
							position.y -= speed*time;
						}
						
					}else{
						
						if((position.y+speed*time)/60>=Math.round(position.y/60)){
							position.y = Math.round(position.y/60)*60;
						}else{
							position.y += speed*time;
						}
					}
				}
			break;

			case 1:
				if(Number.isInteger(position.x/60)){
					position.y-=speed*time;
				}else{
					if(position.x/60>Math.round(position.x/60)){
						
						if((position.x-speed*time)/60<=Math.round(position.x/60)){
							position.x = Math.round(position.x/60)*60;
						}else{
							position.x -= speed*time;
						}
						
					}else{
						
						if((position.x+speed*time)/60>=Math.round(position.x/60)){
							position.x = Math.round(position.x/60)*60;
						}else{
							position.x += speed*time;
						}
					}
				}
			break;

			case 2:
				if(Number.isInteger(position.y/60)){
					position.x+=speed*time;
				}else{
					if(position.y/60>Math.round(position.y/60)){
						
						if((position.y-speed*time)/60<=Math.round(position.y/60)){
							position.y = Math.round(position.y/60)*60;
						}else{
							position.y -= speed*time;
						}
						
					}else{
						
						if((position.y+speed*time)/60>=Math.round(position.y/60)){
							position.y = Math.round(position.y/60)*60;
						}else{
							position.y += speed*time;
						}
					}
				}
			break;

			case 3:
				if(Number.isInteger(position.x/60)){
					position.y+=speed*time;
				}else{
					if(position.x/60>Math.round(position.x/60)){
						
						if((position.x-speed*time)/60<=Math.round(position.x/60)){
							position.x = Math.round(position.x/60)*60;
						}else{
							position.x -= speed*time;
						}
						
					}else{
						
						if((position.x+speed*time)/60>=Math.round(position.x/60)){
							position.x = Math.round(position.x/60)*60;
						}else{
							position.x += speed*time;
						}
					}
				}
			break;

			default:
				time = 0;
				lastTimestamp = 0;
			break;
		}
		lastTimestamp = Date.now();
		socket.emit("position direction",{position:position,direction:direction});
	},40);

	this.setDirection = function(d){
		direction = d;
	};
};

module.exports = user;