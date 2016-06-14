module.exports = Environment;

function Environment(){	
	this.map = [];
	this.numberColumn = 32;
	this.numberLine = 16;
	this.sizeCell = 60;
	this.initialize();
}

Environment.prototype.emitTo = function(user){
	user.socket.emit("server sends game env to client",{
		map:this.map,
		numberColumn:this.numberColumn,
		numberLine:this.numberLine,
		sizeCell:this.sizeCell
	});
};

Environment.prototype.initialize = function(){
	var random;
	for(var i=0;i<this.numberColumn;i++){
		this.map[i] = [];
		for(var j=0;j<this.numberLine;j++){
			random = Math.random();
			if(random<0.33/4){
				this.map[i][j] = {type:"brique"};
			}else if(random<0.66/4){
				this.map[i][j] = {type:"bois"};
			}else{
				this.map[i][j] = {type:"empty"};
			}
		}
	}
	this.map[5][3]["type"] = "empty";
};
Environment.prototype.belongToMap = function(coord){
	if(coord.x>=0 && coord.x <= this.sizeCell*this.numberColumn && coord.y>=0 && coord.y <= this.sizeCell*this.numberLine){
		return true;
	}else{
		return false;
	}
};
Environment.prototype.cellBelongToMap = function(cell){
	if(cell.x>=0 && cell.x < this.numberColumn && cell.y>=0 && cell.y < this.numberLine){
		return true;
	}else{
		return false;
	}
};
/*
for(i=0;i<numberColumn;i++){
map[i][0] = {type:"bedrock"};
map[i][numberLine-1] = {type:"bedrock"};
}
for(j=0;j<numberLine;j++){
map[0][j] = {type:"bedrock"};
map[numberColumn-1][j] = {type:"bedrock"};
}*/