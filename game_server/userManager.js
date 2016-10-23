var User = require("./user.js");
module.exports = UserManager;

function UserManager(io, gameManager) {
    "use strict";
    this.io = io;
    this.gameManager = gameManager;
    this.users = {};
}

UserManager.prototype = {
    addUser: function (socket, pseudo) {
        "use strict";
        this.users[socket.id] = new User(socket, pseudo, this.gameManager, this.io);
    },
    deleteUser: function (idSocket) {
        "use strict";
        this.users[idSocket].disconnect();
        console.log("The user " + this.users[idSocket].pseudo + " has been removed from UserManager");
        delete this.users[idSocket];
    }
};



