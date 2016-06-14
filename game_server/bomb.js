var bomb = function(_personnage, cell){

	var that = this;
	var personnage = _personnage;
	personnage.bomb[cell.x+"/"+cell.y] = this;
	var env = _personnage.gameClassic.env;
	var cell = {x:cell.x,y:cell.y}
	var pos = {x:cell.x*env.sizeCell+env.sizeCell/2,y:cell.y*env.sizeCell+env.sizeCell/2};
	var timerExplosion;
	env.map[cell.x][cell.y] = {type:"bomb",position:{x:pos.x,y:pos.y}};	
	var rangeBomb = 5;

	//on met a jour la map car une bombe vient d'etre posé
	personnage.io.sockets.in(personnage.refGame).emit("modify cell", {i:cell.x, j:cell.y, value:env.map[cell.x][cell.y]});
	
	

	this.explosion = function(){
		clearTimeout(timerExplosion);
		var cellAffected = {};
		var j = 1;
		var stop1, stop2, stop3, stop4;
		stop1 = stop2 = stop3 = stop4 = false;

		personnage.io.sockets.in(personnage.refGame).emit("sound explosion bomb");	
		toDo(cellAffected, cell.x,cell.y, env.map);
		
		test();
		function test(){


			if(stop1!=true){		
				stop1 = env.cellBelongToMap({x:cell.x-j,y:cell.y}) ? toDo(cellAffected, cell.x-j,cell.y, env.map) : true;
			}
			if(stop2!=true)	{
				stop2 = env.cellBelongToMap({x:cell.x,y:cell.y-j}) ? toDo(cellAffected, cell.x,cell.y-j, env.map) : true;
			}
			if(stop3!=true)	{
				stop3 = env.cellBelongToMap({x:cell.x+j,y:cell.y}) ? toDo(cellAffected, cell.x+j,cell.y, env.map) : true;
			}
			if(stop4!=true)	{
				stop4 = env.cellBelongToMap({x:cell.x,y:cell.y+j}) ? toDo(cellAffected, cell.x,cell.y+j, env.map) : true;
			}


			j++;
			if(j<rangeBomb){
				setTimeout(test,50);
				for(var ref in personnage.gameClassic.players){
					var player = personnage.gameClassic.players[ref];
					var pos = player.getCell();
					if(cellAffected[pos.x+"/"+pos.y]!=undefined){
						player.health.current -= 500;
						delete cellAffected[pos.x+"/"+pos.y];
					}
				}
			}else{

			}
			
		}
		



		function toDo(cellAffected, x, y, map){

			if(env.map[x][y]["type"] == "brique" || env.map[x][y]["type"] == "bois" || env.map[x][y]["type"] == "bedrock"){
				var etendre = true;
			}else{
				var etendre = false;
			}

			cellAffected[x+"/"+y] = env.map[x][y];

			if(env.map[x][y]["type"] == "bois" || env.map[x][y]["type"] == "bomb" || env.map[x][y]["type"] == "empty"){
				if(!(x==cell.x && y ==cell.y) && env.map[x][y]["type"] == "bomb"){
					for(var ref in personnage.gameClassic.players){
						if(personnage.gameClassic.players[ref].bomb[x+"/"+y]!=undefined) {
							personnage.gameClassic.players[ref].bomb[x+"/"+y].explosion();
							delete personnage.gameClassic.players[ref].bomb[x+"/"+y];
						}
					}
				}
				env.map[x][y]["type"] = "empty";	
				personnage.io.sockets.in(personnage.refGame).emit("modify cell", {i:x, j:y, value:env.map[x][y]});	
				personnage.io.sockets.in(personnage.refGame).emit("explosion bomb", {x:x,y:y});						
			}
			return etendre;
			
		}


	};

	timerExplosion = setTimeout(that.explosion,3000);

};
module.exports = bomb;