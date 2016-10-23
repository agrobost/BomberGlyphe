var Character = require("./character.js");
var BombManager = require("./bombManager.js");
var Environment = require("./environment.js");
module.exports = GameClassic;

function GameClassic(io, refGame) {
    "use strict";
    this.refGame = refGame;
    this.io = io;
    this.characters = {};
    this.env = new Environment();
    this.bombManager = new BombManager();
    this.timerPing = undefined;
}

GameClassic.prototype = {
    addUser: function (user) {
        "use strict";
        if (Object.keys(this.characters).length >= 6) {
            return false;
        }
        user.socket.join(this.refGame);
        user.socket.emit("server sends game env to client", {
            map: this.env.map,
            numberColumn: this.env.numberColumn,
            numberLine: this.env.numberLine,
            sizeCell: this.env.sizeCell
        });

        user.game = this;

        this.characters[user.socket.id] = new Character(user, this.io, this.refGame, this, Object.keys(this.characters).length);

        for (var id in this.characters) {
            if (this.characters.hasOwnProperty(id)) {
                user.socket.emit("initialize champion", this.characters[id].toObject());
            }
        }
        user.socket.broadcast.to(this.refGame).emit('initialize champion', this.characters[user.socket.id].toObject());
        return true;
    },
    deleteUser: function (idSocket) {
        "use strict";
        console.log("removing user from its current game");
        this.characters[idSocket].user.game = null;
        this.characters[idSocket].stopInterval();
        delete this.characters[idSocket];
        this.io.sockets.in(this.refGame).emit('a player disconnects', idSocket);
    }
};



