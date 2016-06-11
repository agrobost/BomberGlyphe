var mouvementCharacter = function(personnage){

	this.personnage = personnage;
	
	//this.lastPosition = {x:personnage.position.x, y:personnage.position.y};
	//this.lastValueCell = 0;
	var that = this;
	var position = this.personnage.position;
	var nextDirection = -1;
	var frequence = 20;
	var speed = this.personnage.speed;
	var env = this.personnage.gameClassic.env;
	var futurPosition, x, roundX, signe, max, realDistance;
	var hasBeenChanged;

	/**********          ENVOIE POSISTION DU CLIENT EN FONCTION DES TOUCHE FLéché APPUYé          **********/
	setInterval(function(){		
		
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


		var left = {x:Math.round((futurPosition.x-env.sizeCell)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var top = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell)/env.sizeCell)};
		var right = {x:Math.round((futurPosition.x)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var bot = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y)/env.sizeCell)};
		var leftCell = env.map[left.x][left.y];
		var topCell = env.map[top.x][top.y];
		var rightCell = env.map[right.x][right.y];
		var botCell = env.map[bot.x][bot.y];

		var currentCell = env.map[Math.round((position.x-env.sizeCell/2)/env.sizeCell)][Math.round((position.y-env.sizeCell/2)/env.sizeCell)];

		if(nextDirection == 37 && (leftCell === 0 || leftCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			hasBeenChanged = true;
		}else if(nextDirection == 38 && (topCell === 0 || topCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			hasBeenChanged = true;
		}else if(nextDirection == 39 && (rightCell === 0 || rightCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			hasBeenChanged = true;
		}else if(nextDirection == 40 && (botCell === 0 || botCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			hasBeenChanged = true;
		}else{
			hasBeenChanged = false;
		}
		
		

	

		personnage.user.getSocket().emit("update champion", {id:personnage.user.getSocket().id,position:position, nextDirection:nextDirection, hasBeenChanged:hasBeenChanged});

	}, frequence);

	/**********          RECEPTION DE LA DIRECTION A PRENDRE         **********/
	personnage.user.getSocket().on("next direction", function(nd){
		nextDirection = nd;
	});
}

module.exports = mouvementCharacter;