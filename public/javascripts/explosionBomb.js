function ExplosionBombe(cell){
	this.progress = 0;
	this.cell = cell; 
}
ExplosionBombe.sprite = new Image();
ExplosionBombe.sprite.src = '../images/explosion.png';
ExplosionBombe.DUREE_ANIMATION = 1500;
ExplosionBombe.WIDTH = 900;
ExplosionBombe.HEIGHT = 900;
ExplosionBombe.COLUMN = 9;
ExplosionBombe.LINE = 9;

ExplosionBombe.prototype.draw = function(ctx, canvas, timestamp) {

	var pourcentage;
	var numero;
	var i, j;
	var width = ExplosionBombe.WIDTH;
	var height = ExplosionBombe.HEIGHT;
	var column = ExplosionBombe.COLUMN;
	var line = ExplosionBombe.LINE;

	if(this.progress>ExplosionBombe.DUREE_ANIMATION){
		removeAnimation(this);
		return;
	}

	pourcentage = this.progress / ExplosionBombe.DUREE_ANIMATION;
	numero = Math.round(pourcentage*column*line);
	i = numero%column;
	j = Math.floor(numero/column);
	

	ctx.drawImage(ExplosionBombe.sprite,(width/column)*i,(height/line)*j,width/column,height/line,this.cell.x*env.sizeCell,this.cell.y*env.sizeCell,env.sizeCell,env.sizeCell);


	this.progress += timestamp;
}
ExplosionBombe.playSound = function(){
	var audio = new Audio('../images/soundBomb.wav');
	audio.play();
}