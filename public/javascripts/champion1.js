var Champion1 = function(x, y){
	var position = {x:x,y:x};
	var positionReceived = {x:x,y:y};
	var nextDirectionReceived = -1;

	var sprite = new Image();
	sprite.src = '../images/sprite1.png';
	var xSprite, ySprite, widthSprite, heightSprite;
	var columnSprite = 1;
	var lineSprite = 0;
	var nextDirection = [];
	
	var time = 0, lastTimestamp = 0;
	var time2 = 0, lastTimestamp2 = 0;
	var timer = 0;
	var speed = 0.200;

	this.draw = function(ctx, canvas){

		time = Date.now()-lastTimestamp;
		if(lastTimestamp == 0)
			time = 0;
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
				//columnSprite = 1;
			break;
		}
		lastTimestamp = Date.now();

		time2 = Date.now()-lastTimestamp2;
		if(lastTimestamp2 == 0)
			time2 = 0;
		switch(nextDirectionReceived){
			case 0:
				if(Number.isInteger(positionReceived.y/60)){
					positionReceived.x-=speed*time2;
				}else{
					if(positionReceived.y/60>Math.round(positionReceived.y/60)){
						
						if((positionReceived.y-speed*time2)/60<=Math.round(positionReceived.y/60)){
							positionReceived.y = Math.round(positionReceived.y/60)*60;
						}else{
							positionReceived.y -= speed*time2;
						}
						
					}else{
						
						if((positionReceived.y+speed*time2)/60>=Math.round(positionReceived.y/60)){
							positionReceived.y = Math.round(positionReceived.y/60)*60;
						}else{
							positionReceived.y += speed*time2;
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
				if(Number.isInteger(positionReceived.x/60)){
					positionReceived.y-=speed*time2;
				}else{
					if(positionReceived.x/60>Math.round(positionReceived.x/60)){
						
						if((positionReceived.x-speed*time2)/60<=Math.round(positionReceived.x/60)){
							positionReceived.x = Math.round(positionReceived.x/60)*60;
						}else{
							positionReceived.x -= speed*time2;
						}
						
					}else{
						
						if((positionReceived.x+speed*time2)/60>=Math.round(positionReceived.x/60)){
							positionReceived.x = Math.round(positionReceived.x/60)*60;
						}else{
							positionReceived.x += speed*time2;
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
				if(Number.isInteger(positionReceived.y/60)){
					positionReceived.x+=speed*time2;
				}else{
					if(positionReceived.y/60>Math.round(positionReceived.y/60)){
						
						if((positionReceived.y-speed*time2)/60<=Math.round(positionReceived.y/60)){
							positionReceived.y = Math.round(positionReceived.y/60)*60;
						}else{
							positionReceived.y -= speed*time2;
						}
						
					}else{
						
						if((positionReceived.y+speed*time2)/60>=Math.round(positionReceived.y/60)){
							positionReceived.y = Math.round(positionReceived.y/60)*60;
						}else{
							positionReceived.y += speed*time2;
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
				if(Number.isInteger(positionReceived.x/60)){
					positionReceived.y+=speed*time2;
				}else{
					if(positionReceived.x/60>Math.round(positionReceived.x/60)){
						
						if((positionReceived.x-speed*time2)/60<=Math.round(positionReceived.x/60)){
							positionReceived.x = Math.round(positionReceived.x/60)*60;
						}else{
							positionReceived.x -= speed*time2;
						}
						
					}else{
						
						if((positionReceived.x+speed*time2)/60>=Math.round(positionReceived.x/60)){
							positionReceived.x = Math.round(positionReceived.x/60)*60;
						}else{
							positionReceived.x += speed*time2;
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
				time2 = 0;
				lastTimestamp = 0;
				columnSprite = 1;
			break;
		}
		lastTimestamp2 = Date.now();

		if(Date.now()-timer > 10){
			timer = Date.now();
			socket.emit("position", {position:position,nextDirection:nextDirection[0]});
		}

		//ctx.drawImage(sprite,(192/3)*columnSprite,(256/4)*lineSprite,(192/3),(256/4),position.x,position.y,sizeCell,sizeCell);
		ctx.drawImage(sprite,(192/3)*columnSprite,(256/4)*lineSprite,(192/3),(256/4),positionReceived.x,positionReceived.y,sizeCell,sizeCell);
	}
	this.onKeyDown = function(e){
		var key = event.keyCode || event.which;
  		var keychar = String.fromCharCode(key);
  		//console.log("nom"+key+"/"+keychar);
		switch(key){
			case 37:
				if(nextDirection.indexOf(0)==-1){
					nextDirection.push(0);
				}
			break;

			case 38:
				if(nextDirection.indexOf(1)==-1){
					nextDirection.push(1);
				}
			break;

			case 39:
				if(nextDirection.indexOf(2)==-1){
					nextDirection.push(2);
				}
			break;

			case 40:
				if(nextDirection.indexOf(3)==-1){
					nextDirection.push(3);
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
			break;

			case 38:
				index = nextDirection.indexOf(1);
				nextDirection.splice(index, 1);
			break;

			case 39:
				index = nextDirection.indexOf(2);	
				nextDirection.splice(index, 1);
			break;

			case 40:
				index = nextDirection.indexOf(3);
				nextDirection.splice(index, 1);
			break;

			default:
			break;
		}
	}
	this.setPosition = function(p,nd){
		positionReceived = p;
		nextDirectionReceived = nd;
	}

}
