"use strict";

var socket = io();



var canvas = document.getElementById("canvas");	
var ctx = canvas.getContext("2d");

var champions = {};

var brique = new Image();
brique.src = '../images/brique.png';
var bois = new Image();
bois.src = '../images/bois.png';
var bombe = new Image();
bombe.src = '../images/bombe.png';

var env;
var deplacement = new deplacement();




function draw(timestamp){	
	var i,j;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for(i=0;i<env.numberColumn;i++){
		for(j=0;j<env.numberLine;j++){		
			ctx.beginPath();
			ctx.lineWidth="1";
			ctx.strokeStyle ="#f2f2f2";
			ctx.rect(i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
			ctx.stroke();
			switch(env.map[i][j]){
				case 2:
				ctx.drawImage(brique,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
				break;

				case 3:
				ctx.drawImage(bois,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
				break;

				case 4:
				ctx.drawImage(bombe,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
				break;

				default:
				break;
			}			
		}
	}

	champions[sessionStorage.id].showCurrentCell(ctx, canvas);
	for (var idSocket in champions) {
		champions[idSocket].draw(ctx, canvas);
	}

	requestAnimationFrame(draw);	
};



