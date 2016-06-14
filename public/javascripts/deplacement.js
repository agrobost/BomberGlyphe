"use strict";
var deplacement = function(){
	var nextDirection = [];	
	var down = {};

	this.sendNextDirection = function(){
		socket.emit("next direction", nextDirection[0]);
	};

	this.keyDown = function(e){
		var keycode = (e.keyCode ? e.keyCode : e.which);
		switch(keycode){
			case 37://left			
			empiler(37);			
			break;

			case 38://top
			empiler(38);
			break;

			case 39://right
			empiler(39);
			break;

			case 40://bot
			empiler(40)
			break;

			case 32://espace
			if(down[32] == null){
				socket.emit("space down");
				down[32] = true;
			}
			break;

			default:
			break;
		}

	};
	this.keyUp = function(e){
		var keycode = (e.keyCode ? e.keyCode : e.which);
		down[keycode] = null;

		switch(keycode){
			case 37://left
			depiler(37);
			break;

			case 38://top
			depiler(38);
			break;

			case 39://right
			depiler(39);
			break;

			case 40://bot
			depiler(40);
			break;

			default:
			break;
		}

	};

	var empiler = function(element){
		if(down[element] == null){			
			nextDirection.push(element);
			down[element] = true;
			if(nextDirection.length == 1){
				deplacement.sendNextDirection();
			}
		}		
	}

	var depiler = function(element){
		nextDirection.splice(nextDirection.indexOf(element), 1);
		deplacement.sendNextDirection();
	}

}
