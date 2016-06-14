var GameClassic = require("./gameClassic.js");

module.exports = GameManager;

function GameManager(io){	

	/*singleton*/
	if (arguments.callee._singletonInstance) {
		return arguments.callee._singletonInstance;
	}
	arguments.callee._singletonInstance = this;

	this.gamesClassic = {};
	this.io = io;

	this.joinClassicGame = function(user){
		for(var id in this.gamesClassic){
			if(this.gamesClassic[id].addPlayer(user)){				
				return;
			}
		}

		var refGame = this.createRef();
		this.gamesClassic[refGame] = new GameClassic(io, refGame);
		this.gamesClassic[refGame].addPlayer(user);		
	};
	

	this.createRef = function(){
		do{
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 6; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));
		}while(this.gamesClassic[text]!=undefined);

		return text;
	}
};


