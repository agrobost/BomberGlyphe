document.addEventListener("keydown", function(e) {
	champion1.onKeyDown(e);	
}, false);
document.addEventListener("keyup", function(e) {
	champion1.onKeyUp(e);	
}, false);

socket.on("yolo", function(data){	
	console.log("coucou toi");
});
socket.on("position direction", function(data){
	champion1.setPosition(data.position, data.direction);
});