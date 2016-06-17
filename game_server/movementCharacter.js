var mouvementCharacter = function(character){

	this.character = character;	
	var position = this.character.position;
	var nextDirection = -1;
	var frequence = 10;
	
	var character = this.character;
	var env = this.character.gameClassic.env;
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
				futurPosition.x -= character.speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*character.speed*frequence) < Math.abs(max) ? signe*character.speed*frequence : max;
			futurPosition.y += realDistance;			
			break;

			case 38:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y -= character.speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*character.speed*frequence) < Math.abs(max) ? signe*character.speed*frequence : max;
			futurPosition.x += realDistance;
			break;

			case 39:			
			x = (position.y-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.x += character.speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*character.speed*frequence) < Math.abs(max) ? signe*character.speed*frequence : max;
			futurPosition.y += realDistance;
			break;

			case 40:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y += character.speed*frequence;
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*character.speed*frequence) < Math.abs(max) ? signe*character.speed*frequence : max;
			futurPosition.x += realDistance;
			break;

			default:
			break;
		}

		var currentCell = env.map[Math.round((position.x-env.sizeCell/2)/env.sizeCell)][Math.round((position.y-env.sizeCell/2)/env.sizeCell)]["type"];

		switch(nextDirection){
			case 37:
			var cell = {x:Math.round((futurPosition.x-env.sizeCell)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/4)/env.sizeCell)};
			var typeCell = env.cellBelongToMap(cell) ? env.map[cell.x][cell.y]["type"] : undefined;
			if(typeCell === "empty" || typeCell === "bonusBomb" || typeCell === "bonusSpeed" || typeCell === "bonusPowder" || typeCell === currentCell){
				updatePosition()
				that.character.orientation = 37;
				f1();
			}else{
				f2();
			}

			break;

			case 38:
			var cell = {x:Math.round((futurPosition.x-env.sizeCell/4)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell)/env.sizeCell)};
			var typeCell = env.cellBelongToMap(cell) ? env.map[cell.x][cell.y]["type"] : undefined;
			if(typeCell === "empty" || typeCell === "bonusBomb" || typeCell === "bonusSpeed" || typeCell === "bonusPowder" || typeCell === currentCell){
				updatePosition()
				that.character.orientation = 38;
				f1();
			}else{
				f2();
			}

			break;

			case 39:
			var cell = {x:Math.round((futurPosition.x)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/4)/env.sizeCell)};
			var typeCell = env.cellBelongToMap(cell) ? env.map[cell.x][cell.y]["type"] : undefined;
			if(typeCell === "empty" || typeCell === "bonusBomb" || typeCell === "bonusSpeed" || typeCell === "bonusPowder" || typeCell === currentCell){		
				updatePosition()
				that.character.orientation = 39;
				f1();
			}else{
				f2();
			}

			break;

			case 40:
			var cell = {x:Math.round((futurPosition.x-env.sizeCell/4)/env.sizeCell),y:Math.round((futurPosition.y)/env.sizeCell)};
			var typeCell = env.cellBelongToMap(cell) ? env.map[cell.x][cell.y]["type"] : undefined;
			if(typeCell === "empty" || typeCell === "bonusBomb" || typeCell === "bonusSpeed" || typeCell === "bonusPowder" || typeCell === currentCell){
				updatePosition()
				that.character.orientation = 40;
				f1();			
			}else{
				f2();
			}

			break;

			default:
			f2();
			break;
		}		
		function f1(){
			if(hasBeenChanged==false)
				that.character.io.sockets.in(that.character.refGame).emit("update champion", {id:that.character.user.socket.id, hasBeenChanged:true});
			hasBeenChanged = true;
		}
		function f2(){
			if(hasBeenChanged==true)
				that.character.io.sockets.in(that.character.refGame).emit("update champion", {id:that.character.user.socket.id, hasBeenChanged:false});
			hasBeenChanged = false;
		}
		function updatePosition(){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
			that.character.checkBonus();
		}

		that.character.io.sockets.in(that.character.refGame).emit("update champion", {id:that.character.user.socket.id,debug:position});
		



	}, frequence);

var timer2 = setInterval(function(){
	that.character.io.sockets.in(that.character.refGame).emit("update champion", {id:that.character.user.socket.id,position:position});
},200);

/**********          RECEPTION DE LA DIRECTION A PRENDRE         **********/
that.character.user.socket.on("next direction", function(nd){
	nextDirection = nd;
	that.character.io.sockets.in(that.character.refGame).emit("update champion", {id:that.character.user.socket.id, nextDirection:nextDirection});

});

this.stopInterval = function(){
	clearInterval(timer);
	clearInterval(timer2);
};
}

module.exports = mouvementCharacter;