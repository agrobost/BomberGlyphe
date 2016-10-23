var GameClassic = require("./gameClassic.js");
module.exports = GameManager;

function GameManager(io) {
    "use strict";
    this.gamesClassic = {};
    this.io = io;
}

GameManager.prototype = {
    joinClassicGame: function (user) {
        "use strict";
        for (var id in this.gamesClassic) {
            if (this.gamesClassic[id].addUser(user)) {
                return;
            }
        }
        var refGame = this.createRef();
        this.gamesClassic[refGame] = new GameClassic(this.io, refGame);
        this.gamesClassic[refGame].addUser(user);
    },
    createRef: function () {
        "use strict";
        var text = "";
        do {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 6; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        } while (this.gamesClassic[text] !== undefined);
        return text;
    }
};

