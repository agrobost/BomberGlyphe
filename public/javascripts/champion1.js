var Champion1 = function(x, y){
	var position = {x:x,y:x};
	var sprite = new Image();
	sprite.src = '../images/sprite1.png';
	var moveLeft = false;
	var moveTop = false;
	var moveRight = false;
	var moveBot = false;
	var nextDirection = [];
	var direction;
	var time, lastTimestamp;
	var speed = 0.200;
	var xSprite, ySprite, widthSprite, heightSprite;
	var columnSprite = 1;
	var lineSprite = 0;
	this.draw = function(ctx, canvas){
		
		time = Date.now()-lastTimestamp;
		switch(nextDirection[0]){
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
				lineSprite = 1;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					columnSprite++;
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
				lineSprite = 3;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					columnSprite++;
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
				lineSprite = 2;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					columnSprite++;
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
				lineSprite = 0;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					columnSprite++;
				}
			break;

			default:
				time = 0;
				lastTimestamp = 0;
				columnSprite = 1;
			break;
		}
		lastTimestamp = Date.now();

		ctx.drawImage(sprite,(192/3)*columnSprite,(256/4)*lineSprite,(192/3),(256/4),position.x,position.y,sizeCell,sizeCell);
	}
	this.onKeyDown = function(e){
		var key = event.keyCode || event.which;
  		var keychar = String.fromCharCode(key);
  		//console.log("nom"+key+"/"+keychar);
		switch(key){
			case 37:
				if(nextDirection.indexOf(0)==-1){
					nextDirection.push(0);
					socket.emit("next direction",nextDirection[0]);
				}
			break;

			case 38:
				if(nextDirection.indexOf(1)==-1){
					nextDirection.push(1);
					socket.emit("next direction",nextDirection[0]);
				}
			break;

			case 39:
				if(nextDirection.indexOf(2)==-1){
					nextDirection.push(2);
					socket.emit("next direction",nextDirection[0]);
				}
			break;

			case 40:
				if(nextDirection.indexOf(3)==-1){
					nextDirection.push(3);
					socket.emit("next direction",nextDirection[0]);
				}
			break;

			default:
			break;
		}
	}
	this.onKeyUp = function(e){
		var key = event.keyCode || event.which;
  		var keychar = String.fromCharCode(key);
  		var index;
		switch(key){
			case 37:
				index = nextDirection.indexOf(0);
				nextDirection.splice(index, 1);
				socket.emit("next direction",nextDirection[0]);
			break;

			case 38:
				index = nextDirection.indexOf(1);
				nextDirection.splice(index, 1);
				socket.emit("next direction",nextDirection[0]);
			break;

			case 39:
				index = nextDirection.indexOf(2);	
				nextDirection.splice(index, 1);
				socket.emit("next direction",nextDirection[0]);
			break;

			case 40:
				index = nextDirection.indexOf(3);
				nextDirection.splice(index, 1);
				socket.emit("next direction",nextDirection[0]);
			break;

			default:
			break;
		}
	}
	this.setPosition = function(p,d){
		position = p;
		direction = d;

	}

}
