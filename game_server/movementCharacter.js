var mouvementCharacter = function(personnage){

	this.personnage = personnage;	
	var position = this.personnage.position;
	var nextDirection = -1;
	var frequence = 10;
	var speed = this.personnage.speed;
	var env = this.personnage.gameClassic.env;
	var futurPosition, x, roundX, signe, max, realDistance;
	var hasBeenChanged;
	var that = this;

	/**********          ENVOIE POSISTION DU CLIENT EN FONCTION DES TOUCHE FLéché APPUYé          **********/
	var timer = setInterval(function(){		
		
		futurPosition = Object.assign({},position);
		switch(nextDirection){
			case 37:
			x = (position.y-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.x -= speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*frequence) < Math.abs(max) ? signe*speed*frequence : max;
			futurPosition.y += realDistance;			
			break;

			case 38:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y -= speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*frequence) < Math.abs(max) ? signe*speed*frequence : max;
			futurPosition.x += realDistance;
			break;

			case 39:			
			x = (position.y-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.x += speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*frequence) < Math.abs(max) ? signe*speed*frequence : max;
			futurPosition.y += realDistance;
			break;

			case 40:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y += speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*frequence) < Math.abs(max) ? signe*speed*frequence : max;
			futurPosition.x += realDistance;
			break;

			default:
			break;
		}


		//console.log(futurPosition);
		var left = {x:Math.round((futurPosition.x-env.sizeCell)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var top = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell)/env.sizeCell)};
		var right = {x:Math.round((futurPosition.x)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var bot = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y)/env.sizeCell)};
		//console.log(bot);
		var leftCell = env.cellBelongToMap(left) ? env.map[left.x][left.y]["type"] : undefined;
		var topCell = env.cellBelongToMap(top) ? env.map[top.x][top.y]["type"] : undefined;
		var rightCell = env.cellBelongToMap(right) ? env.map[right.x][right.y]["type"] : undefined;
		var botCell = env.cellBelongToMap(bot) ? env.map[bot.x][bot.y]["type"] : undefined;

		var currentCell = env.map[Math.round((position.x-env.sizeCell/2)/env.sizeCell)][Math.round((position.y-env.sizeCell/2)/env.sizeCell)]["type"];

		if(nextDirection == 37 && (leftCell === "empty" || leftCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			that.personnage.orientation = 37;
			hasBeenChanged = true;
		}else if(nextDirection == 38 && (topCell === "empty" || topCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			that.personnage.orientation = 38;
			hasBeenChanged = true;
		}else if(nextDirection == 39 && (rightCell === "empty" || rightCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			that.personnage.orientation = 39;
			hasBeenChanged = true;
		}else if(nextDirection == 40 && (botCell === "empty" || botCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			that.personnage.orientation = 40;
			hasBeenChanged = true;
		}else{
			hasBeenChanged = false;
		}
		
		that.personnage.io.sockets.in(that.personnage.refGame).emit("update champion", {id:that.personnage.user.socket.id,position:position, nextDirection:nextDirection, hasBeenChanged:hasBeenChanged});

	}, frequence);

	/**********          RECEPTION DE LA DIRECTION A PRENDRE         **********/
	that.personnage.user.socket.on("next direction", function(nd){
		nextDirection = nd;
	});

	this.stopInterval = function(){
		clearInterval(timer);
	};
}

module.exports = mouvementCharacter;