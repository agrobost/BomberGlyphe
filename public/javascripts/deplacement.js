"use strict";
var deplacement = function(){
	var position;
	var nextDirection = [];	
	var speed;
	var futurPosition;
	var down = {};
	var x, roundX, signe, max, realDistance;

	this.init = function(pos, speeed){
		speed = speeed;
		position = pos;
		var time = 0, lastTimestamp = 0;
		setInterval(function(){ 		
			if(lastTimestamp == 0){
				lastTimestamp = Date.now();
			}
			time = Date.now()-lastTimestamp;
			lastTimestamp = Date.now();	
			updatePosition(position, nextDirection[0], time);			
			socket.emit("position", {position:position,direction:nextDirection[0]});
		}, 50);
	};
	
	var updatePosition = function(position, direction, time){
		futurPosition = Object.assign({},position);
		switch(direction){
			case 37:
			x = (position.y-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.x -= speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.y += realDistance;			
			break;

			case 38:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y -= speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.x += realDistance;
			break;

			case 39:			
			x = (position.y-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.x += speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.y += realDistance;
			break;

			case 40:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y += speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.x += realDistance;
			break;

			default:
			break;
		}
		

		var left = {x:Math.round((futurPosition.x-env.sizeCell)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var top = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell)/env.sizeCell)};
		var right = {x:Math.round((futurPosition.x)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var bot = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y)/env.sizeCell)};
		var leftCell = env.map[left.x][left.y];
		var topCell = env.map[top.x][top.y];
		var rightCell = env.map[right.x][right.y];
		var botCell = env.map[bot.x][bot.y];

		var currentCell = env.map[Math.round((position.x-env.sizeCell/2)/env.sizeCell)][Math.round((position.y-env.sizeCell/2)/env.sizeCell)];

		if(direction == 37 && (leftCell === 0 || leftCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
		}else if(direction == 38 && (topCell === 0 || topCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;

		}else if(direction == 39 && (rightCell === 0 || rightCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
		}else if(direction == 40 && (botCell === 0 || botCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
		}
	};

	this.keyDown = function(e){
		var keycode = (e.keyCode ? e.keyCode : e.which);
		switch(keycode){
			case 37://left
			if(down[37] == null){
				nextDirection.push(37);
				down[37] = true;
			}
			break;

			case 38://top
			if(down[38] == null){
				nextDirection.push(38);
				down[38] = true;
			}
			break;

			case 39://right
			if(down[39] == null){
				nextDirection.push(39);
				down[39] = true;
			}
			break;

			case 40://bot
			if(down[40] == null){
				nextDirection.push(40);
				down[40] = true;
			}
			break;

			case 32://espace
			if(down[32] == null){
				socket.emit("space down");
				down[32] = true;
			}
			break;
		}

	};
	this.keyUp = function(e){
		var keycode = (e.keyCode ? e.keyCode : e.which);
		down[keycode] = null;

		switch(keycode){
			case 37://left
			nextDirection.splice(nextDirection.indexOf(37), 1);
			break;

			case 38://top
			nextDirection.splice(nextDirection.indexOf(38), 1);
			break;

			case 39://right
			nextDirection.splice(nextDirection.indexOf(39), 1);
			break;

			case 40://bot
			nextDirection.splice(nextDirection.indexOf(40), 1);
			break;

			case 32://espace

			break;
		}

	};

}
