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
	console.log(data.i+"/"+data.j+"/"+data.value);
	env.map[data.i][data.j] = data.value;
})
socket.on("position", function(data){
	//console.log(JSON.stringify(data, null, 4));
	if(champions[data.id]!=undefined)	
		champions[data.id].setPosition(data.position, data.direction);		
});
socket.on('a player disconnects', function(id){
	delete champions[id];
});
socket.on('initialize champion', function(data){//data=> {id:user.getSocket().id,vie:vie, mana:mana, speed:speed, position:position};
	champions[data.id] = new Champion1(data.speed, data.position);
	if(sessionStorage.id == data.id){
		deplacement.init(data.position, data.speed);	
	}
});


var down = {};

$(document).keydown(function(e){
	deplacement.keyDown(e);
});
$(document).keyup(function(e) {
	deplacement.keyUp(e);
});