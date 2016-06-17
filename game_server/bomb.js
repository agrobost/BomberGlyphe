var bomb = function(_personnage, cell){

	var that = this;
	var personnage = _personnage;
	personnage.bomb[cell.x+"/"+cell.y] = this;
	var env = _personnage.gameClassic.env;
	var cell = {x:cell.x,y:cell.y}
	var pos = {x:cell.x*env.sizeCell+env.sizeCell/2,y:cell.y*env.sizeCell+env.sizeCell/2};
	var timerExplosion;
	env.map[cell.x][cell.y] = {type:"bomb",position:{x:pos.x,y:pos.y}};	


	//on met a jour la map car une bombe vient d'etre posé
	personnage.io.sockets.in(personnage.refGame).emit("modify cell", {i:cell.x, j:cell.y, value:env.map[cell.x][cell.y]});
	
	

	this.explosion = function(){
		personnage.nbCurrentBomb--;
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
			if(j<personnage.powder){
				setTimeout(test,50);
				for(var ref in personnage.gameClassic.characters){
					var player = personnage.gameClassic.characters[ref];
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

			if(env.map[x][y]["type"] == "brique" || env.map[x][y]["type"] == "bois"){
				var etendre = true;
			}else{
				var etendre = false;
			}

			cellAffected[x+"/"+y] = env.map[x][y];

			if(env.map[x][y]["type"] == "bomb"){
				if(!(x==cell.x && y ==cell.y) && env.map[x][y]["type"] == "bomb"){
					for(var ref in personnage.gameClassic.characters){
						if(personnage.gameClassic.characters[ref].bomb[x+"/"+y]!=undefined) {
							personnage.gameClassic.characters[ref].bomb[x+"/"+y].explosion();
							delete personnage.gameClassic.characters[ref].bomb[x+"/"+y];
						}
					}
				}
				env.map[x][y]["type"] = "empty";	
				personnage.io.sockets.in(personnage.refGame).emit("modify cell", {i:x, j:y, value:env.map[x][y]});					
			}else if(env.map[x][y]["type"] == "bois"){				
				random = Math.random();
				if(random<0.25){
					env.map[x][y]["type"] = "bonusPowder";	
				}else if(random<0.50){
					env.map[x][y]["type"] = "bonusSpeed";	
				}else if(random<0.75){
					env.map[x][y]["type"] = "bonusBomb";	
				}else{
					env.map[x][y]["type"] = "empty";	
				}
				personnage.io.sockets.in(personnage.refGame).emit("modify cell", {i:x, j:y, value:env.map[x][y]});	
			}else if(env.map[x][y]["type"] == "bonusPowder" || env.map[x][y]["type"] == "bonusSpeed" || env.map[x][y]["type"] == "bonusBomb"){
				env.map[x][y]["type"] = "empty";	
				personnage.io.sockets.in(personnage.refGame).emit("modify cell", {i:x, j:y, value:env.map[x][y]});	
			}else{}
			
			personnage.io.sockets.in(personnage.refGame).emit("explosion bomb", {x:x,y:y});		

			return etendre;			
		}
	};

	timerExplosion = setTimeout(that.explosion,3000);

};
module.exports = bomb;