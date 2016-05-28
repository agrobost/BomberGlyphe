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
	var d1 = 0, d2 = 0, d3 = 0, d4 = 0;

	this.draw = function(ctx, canvas){

		time = Date.now()-lastTimestamp;
		if(lastTimestamp == 0)
			time = 0;
		switch(nextDirection[0]){
			case 0:
				if(Number.isInteger(position.y/120)){
					position.x-=speed*time;
				}else{
					if(position.y/120>Math.round(position.y/120)){
						
						if((position.y-speed*time)/120<=Math.round(position.y/120)){
							position.y = Math.round(position.y/120)*120;
						}else{
							position.y -= speed*time;
						}
						
					}else{
						
						if((position.y+speed*time)/120>=Math.round(position.y/120)){
							position.y = Math.round(position.y/120)*120;
						}else{
							position.y += speed*time;
						}
					}
				}
	
			break;

			case 1:
				if(Number.isInteger(position.x/120)){
					position.y-=speed*time;
				}else{
					if(position.x/120>Math.round(position.x/120)){
						
						if((position.x-speed*time)/120<=Math.round(position.x/120)){
							position.x = Math.round(position.x/120)*120;
						}else{
							position.x -= speed*time;
						}
						
					}else{
						
						if((position.x+speed*time)/120>=Math.round(position.x/120)){
							position.x = Math.round(position.x/120)*120;
						}else{
							position.x += speed*time;
						}
					}
				}
		
			break;

			case 2:
				if(Number.isInteger(position.y/120)){
					position.x+=speed*time;
				}else{
					if(position.y/120>Math.round(position.y/120)){
						
						if((position.y-speed*time)/120<=Math.round(position.y/120)){
							position.y = Math.round(position.y/120)*120;
						}else{
							position.y -= speed*time;
						}
						
					}else{
						
						if((position.y+speed*time)/120>=Math.round(position.y/120)){
							position.y = Math.round(position.y/120)*120;
						}else{
							position.y += speed*time;
						}
					}
				}
	
			break;

			case 3:
				if(Number.isInteger(position.x/120)){
					position.y+=speed*time;
				}else{
					if(position.x/120>Math.round(position.x/120)){
						
						if((position.x-speed*time)/120<=Math.round(position.x/120)){
							position.x = Math.round(position.x/120)*120;
						}else{
							position.x -= speed*time;
						}
						
					}else{
						
						if((position.x+speed*time)/120>=Math.round(position.x/120)){
							position.x = Math.round(position.x/120)*120;
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

		time2 = Date.now()-lastTimestamp2;
		if(lastTimestamp2 == 0)
			time2 = 0;
		switch(nextDirectionReceived){
			case 0:
				d2 = 0;
				d3 = 0;
				d4 = 0;
				if(d1 == 0){
					d1 = speed*time2;
				}else{
					d1 += speed*time2;
				}
				lineSprite = 1;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					if(d1>10){
						columnSprite++;
						d1 = 0;
					}
					
				}
				if(Number.isInteger(positionReceived.y/120)){//ou 0 à rajouter
					positionReceived.x-=speed*time2;
					break;
				}
				if(positionReceived.y/120>Math.round(positionReceived.y/120)){
					
					if((positionReceived.y-speed*time2)/120<=Math.round(positionReceived.y/120)){
						positionReceived.y = Math.round(positionReceived.y/120)*120;
					}else{
						positionReceived.y -= speed*time2;
					}
					
				}else{
					
					if((positionReceived.y+speed*time2)/120>=Math.round(positionReceived.y/120)){
						positionReceived.y = Math.round(positionReceived.y/120)*120;
					}else{
						positionReceived.y += speed*time2;
					}
				}
				

			break;

			case 1:
				d1 = 0;
				d3 = 0;
				d4 = 0;
				if(d2 == 0){
					d2 = speed*time2;
				}else{
					d2 += speed*time2;
				}
				lineSprite = 3;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					if(d2>10){
						columnSprite++;
						d2 = 0;
					}
					
				}
				if(Number.isInteger(positionReceived.x/120)){
					positionReceived.y-=speed*time2;
				}else{
					if(positionReceived.x/120>Math.round(positionReceived.x/120)){
						
						if((positionReceived.x-speed*time2)/120<=Math.round(positionReceived.x/120)){
							positionReceived.x = Math.round(positionReceived.x/120)*120;
						}else{
							positionReceived.x -= speed*time2;
						}
						
					}else{
						
						if((positionReceived.x+speed*time2)/120>=Math.round(positionReceived.x/120)){
							positionReceived.x = Math.round(positionReceived.x/120)*120;
						}else{
							positionReceived.x += speed*time2;
						}
					}
				}
			break;

			case 2:
				d2 = 0;
				d1 = 0;
				d4 = 0;
				if(d3 == 0){
					d3 = speed*time2;
				}else{
					d3 += speed*time2;
				}
				lineSprite = 2;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					if(d3>10){
						columnSprite++;
						d3 = 0;
					}
					
				}
				if(Number.isInteger(positionReceived.y/120)){
					positionReceived.x+=speed*time2;
				}else{
					if(positionReceived.y/120>Math.round(positionReceived.y/120)){
						
						if((positionReceived.y-speed*time2)/120<=Math.round(positionReceived.y/120)){
							positionReceived.y = Math.round(positionReceived.y/120)*120;
						}else{
							positionReceived.y -= speed*time2;
						}
						
					}else{
						
						if((positionReceived.y+speed*time2)/120>=Math.round(positionReceived.y/120)){
							positionReceived.y = Math.round(positionReceived.y/120)*120;
						}else{
							positionReceived.y += speed*time2;
						}
					}
				}
			break;

			case 3:
				d2 = 0;
				d1 = 0;
				d3 = 0;
				if(d4 == 0){
					d4 = speed*time2;
				}else{
					d4 += speed*time2;
				}
				lineSprite = 0;
				if(columnSprite==2){
					columnSprite = 0;
				}else{
					if(d4>10){
						columnSprite++;
						d4 = 0;
					}
					
				}
				if(Number.isInteger(positionReceived.x/120)){
					positionReceived.y+=speed*time2;
				}else{
					if(positionReceived.x/120>Math.round(positionReceived.x/120)){
						
						if((positionReceived.x-speed*time2)/120<=Math.round(positionReceived.x/120)){
							positionReceived.x = Math.round(positionReceived.x/120)*120;
						}else{
							positionReceived.x -= speed*time2;
						}
						
					}else{
						
						if((positionReceived.x+speed*time2)/120>=Math.round(positionReceived.x/120)){
							positionReceived.x = Math.round(positionReceived.x/120)*120;
						}else{
							positionReceived.x += speed*time2;
						}
					}
				}
			break;

			default:
				time2 = 0;
				lastTimestamp = 0;
				columnSprite = 1;
				if(lineSprite == 1 || lineSprite == 2)
					columnSprite = 2;
				d1 = 0;
				d2 = 0;
				d3 = 0;
				d4 = 0;
			break;
		}
		lastTimestamp2 = Date.now();

		if(Date.now()-timer > 5){
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
