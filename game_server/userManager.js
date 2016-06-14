var User = require("./user.js");


module.exports = UserManager;

function UserManager(io, gameManager){
	
	/*singleton*/
	if (arguments.callee._singletonInstance) {
		return arguments.callee._singletonInstance;
	}
	arguments.callee._singletonInstance = this;


	this.io = io;
	this.gameManager = gameManager;
	this.users = {};

	/*pas besoin de prototype car 1 seul obj UserManager sera créé*/

	this.addUser = function(socket, pseudo){
		this.users[socket.id] = new User(socket, pseudo, gameManager, this.io);
	};

	this.deleteUser = function(idSocket){
		this.users[idSocket].disconnect();
		delete this.users[idSocket];
		console.log("Un utilisateur viens de se déconnecter");
	};

	this.getUser = function(idSocket){
		return this.users[idSocket];
	};
};



