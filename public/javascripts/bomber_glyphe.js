"use strict";

updateInterface()
$( window ).resize(function() {
	updateInterface()
});

function updateInterface(){
	var heightHead = $("#head").height();
	var width = Math.round(heightHead*16/9);
	var heightSpell = heightHead-$("#canvas").height();
	$("#container").css({
		'height':heightHead+'px',
		'width':width+'px'	
	});
	$("#spell").css({
		'top':heightHead*960/1080+'px',
		'width':width+'px'
	});
	$(".champion_infos").css({
		'height':heightHead*120/1080+'px'
	});
	$(".box_spell").css({
		'height':heightHead*120/1080+'px'
	});
}

var socket = io();
var canvas = document.getElementById("canvas");	
var ctx = canvas.getContext("2d");
var fps = {init:0,nb:0};
var champions = {};

var brique = new Image();
brique.src = '../images/map_environment/brique.png';

var bois = new Image();
bois.src = '../images/map_environment/bois.png';

var bombe = new Image();
bombe.src = '../images/map_environment/bomb.png';

var bonusBomb = new Image();
bonusBomb.src = '../images/map_environment/bonusBomb.png';

var bonusSpeed = new Image();
bonusSpeed.src = '../images/map_environment/bonusSpeed.png';

var bonusPowder = new Image();
bonusPowder.src = '../images/map_environment/bonusPowder.png';


var env;//object assign
var deplacement = new deplacement();
var animations = [];
var time = {last:0,now:0};



function draw(timestamp){
	if(fps.init === 0){
		fps.init = Date.now();
		fps.nb +=1;
	}else{
		fps.nb +=1;
	}
	time.last = time.now;
	time.now = timestamp;
	time.diff = time.now - time.last;	

	var i,j;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle ="#f5deb3";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	for(i=0;i<env.numberColumn;i++){
		for(j=0;j<env.numberLine;j++){		
			ctx.beginPath();
			ctx.lineWidth="1";
			ctx.strokeStyle ="#f5e8d0";
			ctx.rect(i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
			ctx.stroke();
			switch(env.map[i][j]["type"]){
				case "brick":
				ctx.drawImage(brique,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
				break;

				case "wood":
				ctx.drawImage(bois,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
				break;

				case "bomb":
				ctx.drawImage(bombe,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);
                    break;

				case "extra_bomb":
				ctx.drawImage(bonusBomb,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);				
				break;

				case "speed":
				ctx.drawImage(bonusSpeed,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);	

				break;

				case "powder":
				ctx.drawImage(bonusPowder,i*env.sizeCell,j*env.sizeCell,env.sizeCell,env.sizeCell);				
				break;

				default:
				break;
			}			
		}
	}
	if(champions[sessionStorage.id]!==undefined){
		champions[sessionStorage.id].showCurrentCell(ctx, canvas);
	}
	
	for (var idSocket in champions) {
		champions[idSocket].draw(ctx, canvas, time.diff);
	}

	for(var d = 0; d<animations.length; d++){
		animations[d].draw(ctx, canvas, time.diff);
	}

	requestAnimationFrame(draw);	
};

function removeAnimation(animation){
	var index = animations.indexOf(animation);
	if(index>-1){
		animations.splice(index,1)
	}
}



