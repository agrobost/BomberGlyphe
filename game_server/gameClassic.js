var Character = require("./character.js");
var BombManager = require("./bombManager.js");
var Environment = require("./environment.js");

var gameClassic = function (io, refGame) {
    "use strict";
    this.characters = {};
    this.env = new Environment();
    this.bombManager = new BombManager();
    this.timerPing = undefined;
    var that = this;

    this.addPlayer = function (user) {
        if (Object.keys(this.characters).length >= 6) {
            return false;
        }
        user.socket.join(refGame);

        this.env.emitTo(user);

        user.game = that;

        this.characters[user.socket.id] = new Character(user, io, refGame, that, Object.keys(this.characters).length);

        for (var id in this.characters) {
            if (this.characters.hasOwnProperty(id)) {
                user.socket.emit("initialize champion", this.characters[id].toObject());
            }
        }
        user.socket.broadcast.to(refGame).emit('initialize champion', this.characters[user.socket.id].toObject());


        this.timerPing = setInterval(function () {
            user.pinguer();
            user.socket.emit("pinguage");
        }, 1000);

        user.socket.on("ponguage", function (fps) {
            user.ponguer();
            user.fps = fps;
            io.sockets.in(refGame).emit('ping fps', {fps: user.fps, ping: user.ping, id: user.socket.id});
        });

        return true;
    };

    this.deletePlayer = function (idSocket) {
        clearInterval(this.timerPing);
        this.characters[idSocket].stopInterval();
        delete this.characters[idSocket];
        io.sockets.in(refGame).emit('a player disconnects', idSocket);
    };


};

module.exports = gameClassic;