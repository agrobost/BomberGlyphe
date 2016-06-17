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
socket.on("modify cell", function(data){
	env.map[data.i][data.j] = data.value;
});
socket.on("explosion bomb", function(data){//{x:x,y:y}
	animations.push(new ExplosionBombe(data));
});
socket.on('sound explosion bomb', function(){
	ExplosionBombe.playSound();
});


socket.on('a player disconnects', function(id){
	delete champions[id];
});
socket.on('initialize champion', function(data){//data=> {id:user.getSocket().id,health:health, mana:mana, speed:speed, position:position};
	champions[data.id] = new Character(data.speed, data.position, data.health, data.mana, data.positionHtml, data.pseudo);
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

socket.on('pinguage', function(){
	var rate = fps.nb/(Date.now()-fps.init)*1000;
	fps.init = 0;
	fps.nb = 0;
	socket.emit("ponguage", rate);
});
socket.on('ping fps', function(data){
	var position = champions[data.id].positionHtml;
	var ping = "ping"+position;
	var fps = "fps"+position;
	$("#"+ping).html("ping : "+data.ping+"ms");
	$("#"+fps).html("fps : "+Math.round(data.fps)+"f/s");
});

$(document).keydown(function(e){
	deplacement.keyDown(e);
});
$(document).keyup(function(e) {
	deplacement.keyUp(e);
});