socket.on('connect', function(){
	sessionStorage.id = "/#"+socket.io.engine.id;
	var pseudo = prompt("Entrez votre pseudo");
	socket.emit("client sends pseudo to server", pseudo);
	socket.emit('client want find a classic game');
});
socket.on("server sends game env to client", function(environment){
	env = environment;
	requestAnimationFrame(draw);
});
socket.on("space down", function(data){
	env.map[data.i][data.j] = data.value;
})

socket.on('a player disconnects', function(id){
	delete champions[id];
});
socket.on('initialize champion', function(data){//data=> {id:user.getSocket().id,health:health, mana:mana, speed:speed, position:position};
	champions[data.id] = new Character(data.speed, data.position, data.health, data.mana);
});
socket.on('update champion',function(data){	
	for(var ref in data){
		if(ref == "id"){
			continue;
		}
		if(ref == "nextDirection"){
			champions[data.id]["movementCharacter"]["nextDirection"] = data["nextDirection"];
			continue;
		}
		if(ref == "hasBeenChanged"){
			champions[data.id]["movementCharacter"]["hasBeenChanged"] = data["hasBeenChanged"];
			continue;			
		}
		champions[data.id][ref] = data[ref];
	}
});


$(document).keydown(function(e){
	deplacement.keyDown(e);
});
$(document).keyup(function(e) {
	deplacement.keyUp(e);
});