var Bomb = require("./bomb.js");

var bombManager = function(){
	this.dropBomb = function(personnage){
		var env = personnage.gameClassic.env;
		if(personnage.mana.current < 200){
			return;
		}			
		var cell = {x:Math.round((personnage.position.x-env.sizeCell/2)/env.sizeCell),y:Math.round((personnage.position.y-env.sizeCell/2)/env.sizeCell)};		
		if(env.map[cell.x][cell.y]["type"]!="empty"){
			return
		}
		personnage.mana.current -= 20;

		var bomb = new Bomb(personnage, cell);
	};
};

module.exports = bombManager;