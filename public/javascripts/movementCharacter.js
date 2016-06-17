function MovementCharacter(_character){
	this.character = _character
	this.nextDirection = -1; 	
	this.hasBeenChanged = false;
	this.columnSprite = 1;
	this.lineSprite = 0;
	this.step = {left:0, top:0, right:0, left:0, distance:10};
}


MovementCharacter.prototype.update = function(time){
	var x, roundX, signe, max, realDistance;
	var character = this.character;
	var step = this.step;//plus court, step obj
	switch(this.nextDirection){

		case 37:
		step.top = step.right = step.bot = 0;
		step.left += character.speed*time;

		this.lineSprite = 1;
		if(step.left>step.distance){
			this.columnSprite++;
			step.left = 0;
		}
		if(this.columnSprite==3){
			this.columnSprite = 0;
		}			
		break;

		case 38:
		step.left = step.right = step.bot = 0;	
		step.top += character.speed*time;

		this.lineSprite = 3;
		if(step.top>step.distance){
			this.columnSprite++;
			step.top = 0;
		}
		if(this.columnSprite==3){
			this.columnSprite = 0;
		}				
		break;

		case 39:
		step.left = step.top = step.bot = 0;
		step.right += character.speed*time;

		this.lineSprite = 2;
		if(step.right>step.distance){
			this.columnSprite++;
			step.right = 0;
		}
		if(this.columnSprite==3){
			this.columnSprite = 0;
		}			
		break;

		case 40:
		step.left = step.top = step.right = 0;
		step.bot += character.speed*time;

		this.lineSprite = 0;
		if(step.bot>step.distance){
			this.columnSprite++;
			step.bot = 0;
		}
		if(this.columnSprite==3){
			this.columnSprite = 0;
		}
		break;

		default:
		
		if(this.lineSprite == 1 || this.lineSprite == 2){
			this.columnSprite = 2;
		}else{
			this.columnSprite = 1;
		}
		step.left = step.top = step.right = step.bot = 0;
		break;

	}	
	
	if(!this.hasBeenChanged)
		return;

	switch(this.nextDirection){
		case 37:
		x = (character.position.y-env.sizeCell/2)/env.sizeCell;
		roundX = Math.round(x);
		if(x == roundX){
			character.position.x -= character.speed*time
			break;
		}
		signe = (roundX-x)/Math.abs(roundX-x);			
		max = (roundX*env.sizeCell)-character.position.y+env.sizeCell/2;
		realDistance = Math.abs(signe*character.speed*time) < Math.abs(max) ? signe*character.speed*time : max;
		character.position.y += realDistance;			
		break;

		case 38:
		x = (character.position.x-env.sizeCell/2)/env.sizeCell;
		roundX = Math.round(x);
		if(x == roundX){
			character.position.y -= character.speed*time
			break;
		}
		signe = (roundX-x)/Math.abs(roundX-x);			
		max = (roundX*env.sizeCell)-character.position.x+env.sizeCell/2;
		realDistance = Math.abs(signe*character.speed*time) < Math.abs(max) ? signe*character.speed*time : max;
		character.position.x += realDistance;
		break;

		case 39:			
		x = (character.position.y-env.sizeCell/2)/env.sizeCell;
		roundX = Math.round(x);
		if(x == roundX){
			character.position.x += character.speed*time;
			break;
		}
		signe = (roundX-x)/Math.abs(roundX-x);			
		max = (roundX*env.sizeCell)-character.position.y+env.sizeCell/2;
		realDistance = Math.abs(signe*character.speed*time) < Math.abs(max) ? signe*character.speed*time : max;
		character.position.y += realDistance;
		break;

		case 40:
		x = (character.position.x-env.sizeCell/2)/env.sizeCell;
		roundX = Math.round(x);
		if(x == roundX){
			character.position.y += character.speed*time
			break;
		}
		signe = (roundX-x)/Math.abs(roundX-x);			
		max = (roundX*env.sizeCell)-character.position.x+env.sizeCell/2;
		realDistance = Math.abs(signe*character.speed*time) < Math.abs(max) ? signe*character.speed*time : max;
		character.position.x += realDistance;
		break;


		default:
		break;
	}

};
