function Character(_speed, _position, _health, _mana){
	this.position = _position;	
	this.speed = _speed;
	this.health = _health;
	this.mana = _mana;
	this.movementCharacter = new MovementCharacter(this);
	
}
Character.sprite = new Image();
Character.sprite.src = '../images/sprite1.png';

Character.prototype.showCurrentCell = function(ctx, canvas){
	var coord = {x:Math.round((this.position.x-env.sizeCell/2)/env.sizeCell),y:Math.round((this.position.y-env.sizeCell/2)/env.sizeCell)};
	ctx.beginPath();
	ctx.lineWidth="1.5";
	ctx.strokeStyle ="#cccccc";
	ctx.rect(coord.x*env.sizeCell,coord.y*env.sizeCell,env.sizeCell,env.sizeCell);
	ctx.stroke();
};

Character.prototype.draw = function(ctx, canvas, time){
	this.movementCharacter.update(time);	
	ctx.drawImage(Character.sprite,(192/3)*this.movementCharacter.columnSprite,(256/4)*this.movementCharacter.lineSprite,(192/3),(256/4),this.position.x-env.sizeCell/2,this.position.y-env.sizeCell/2,env.sizeCell,env.sizeCell);


	ctx.fillStyle="#262626";
	ctx.fillRect(this.position.x-env.sizeCell/2, this.position.y-env.sizeCell/2-2*env.sizeCell/7,env.sizeCell,env.sizeCell/8);
	ctx.fillStyle="#33cc33";
	ctx.fillRect(this.position.x-env.sizeCell/2, this.position.y-env.sizeCell/2-2*env.sizeCell/7,env.sizeCell*this.health.current/this.health.max,env.sizeCell/8);

	ctx.fillStyle="#262626";
	ctx.fillRect(this.position.x-env.sizeCell/2, this.position.y-env.sizeCell/2-env.sizeCell/7,env.sizeCell,env.sizeCell/8);
	ctx.fillStyle="#0099ff";
	ctx.fillRect(this.position.x-env.sizeCell/2, this.position.y-env.sizeCell/2-env.sizeCell/7,env.sizeCell*this.mana.current/this.mana.max,env.sizeCell/8);




	ctx.font = "12px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText(this.health.current+"/"+this.health.max,this.position.x,this.position.y-env.sizeCell/2-env.sizeCell/7);
	ctx.fillText(this.mana.current+"/"+this.mana.max,this.position.x,this.position.y-env.sizeCell/2);
};