var User = require("./user.js");


module.exports = UserManager;

function UserManager(io, gameManager) {
    "use strict";

    this.io = io;
    this.gameManager = gameManager;
    this.users = {};

    this.addUser = function (socket, pseudo) {
        this.users[socket.id] = new User(socket, pseudo, gameManager, this.io);
    };

    this.deleteUser = function (idSocket) {
        this.users[idSocket].disconnect();
        delete this.users[idSocket];
        console.log("Un utilisateur vient de se déconnecter");
    };

    this.getUser = function (idSocket) {
        return this.users[idSocket];
    };
}



