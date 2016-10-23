module.exports = User;

function User(socket, pseudo, gameManager, io) {
    "use strict";
    this.io = io;
    this.gameManager = gameManager;
    this.pseudo = pseudo;
    this.socket = socket;
    this.ping = 0;
    this.fps = 0;
    this.game = null;

    this.socket.on('client want find a classic game', function () {
        if (this.game === null) {
            this.gameManager.joinClassicGame(this);
        }
    }.bind(this));

    (function (user) {
        var timeLastPing;
        user.timerPing = setInterval(function () {
            timeLastPing = Date.now();
            user.socket.emit("pinguage");
        }.bind(user), 1000);

        user.socket.on("ponguage", function (fps) {
            user.ping = Date.now() - timeLastPing;
            user.fps = fps;
            if (user.game) {
                user.io.sockets.in(user.game.refGame).emit('ping fps', {fps: fps, ping: this.ping, id: user.socket.id});
            }
        }.bind(user));
    })(this);
}

User.prototype = {
    disconnect: function () {
        "use strict";
        clearInterval(this.timerPing);
        if (this.game !== null) {
            this.game.deleteUser(this.socket.id);
        }
    }
};









