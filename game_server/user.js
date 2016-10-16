module.exports = User;

function User(socket, pseudo, gameManager, io) {
    "use strict";
    this.io = io;
    this.gameManager = gameManager;
    this.pseudo = pseudo;
    this.socket = socket;
    this.timeLastPing = undefined;
    this.ping = 0;
    this.fps = 0;
    this.game = null;
    var that = this;


    this.socket.on('client want find a classic game', function () {
        if (that.game == null) {
            that.gameManager.joinClassicGame(that);
        } else {
            console.log("Le client est deja dans une partie");
        }
    });

}

User.prototype.disconnect = function () {
    "use strict";
    if (this.game !== undefined) {
        this.game.deletePlayer(this.socket.id);
    }
};

User.prototype.pinguer = function () {
    "use strict";
    this.timeLastPing = Date.now();
};

User.prototype.ponguer = function () {
    "use strict";
    this.ping = Date.now() - this.timeLastPing;
};

User.prototype.tt = function () {
    "user strict";
    console.log("tetar");
};







