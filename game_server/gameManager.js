"use strict";

var GameClassic = require("./gameClassic.js");


var gameManager = function(io){	

	var gamesClassic = {};

	this.joinClassicGame = function(user){
		for(var id in gamesClassic){
			if(gamesClassic[id].addPlayer(user)){				
				return;
			}
		}

		var refGame = createRef();
		gamesClassic[refGame] = new GameClassic(io, refGame);
		gamesClassic[refGame].addPlayer(user);		
	};
	

	function createRef(){
		do{
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 15; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));
		}while(gamesClassic[text]!=undefined);

		return text;
	}


};


module.exports = gameManager;