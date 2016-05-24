var socket = io();

var champion1 = new Champion1(500,500);
var canvas = document.getElementById("canvas");	
var i, j, k;
var ctx = canvas.getContext("2d");

var brique = new Image();
brique.src = '../images/brique.png';
var bois = new Image();
bois.src = '../images/bois.png';
var sizeCell = 60;
var matrix_map = [];

requestAnimationFrame(draw);

for(i=0;i<32;i++){
	matrix_map[i] = [];
	for(j=0;j<18;j++){
		var random = Math.random();
		if(random<0.33){
			matrix_map[i][j] = 2;
		}else if(random<0.66){
			matrix_map[i][j] = 3;
		}
	}
}
function draw(timestamp){	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#ecf0f1";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	for(i=0;i<32;i++){
		for(j=0;j<18;j++){
			
			switch(matrix_map[i][j]){
				case 2:
					ctx.drawImage(brique,0,0,(192/3),(256/4),i*sizeCell,j*sizeCell,sizeCell,sizeCell);
				break;

				case 3:
					ctx.drawImage(bois,i*sizeCell,j*sizeCell,sizeCell,sizeCell);
				break;
			}		
			
		}
	}
	champion1.draw(ctx, canvas);

	requestAnimationFrame(draw);	
};


function getPos(e){
	var rect = canvas.getBoundingClientRect();
	var x = ((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width) - canvasPosition.x;	
	var y = ((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height) - canvasPosition.y;		
	var column = Math.floor(x/sizeCell);
	var line = Math.floor(y/sizeCell);
	if(column<0 || column >(DIM-1)){
		return false
	}
	if(line<0 || line >(DIM-1)){
		return false
	}
	return [column, line];
}


		