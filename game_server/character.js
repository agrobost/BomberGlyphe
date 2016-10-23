var MovementCharacter = require("./MovementCharacter.js");
var BasicCell = require("./cell/Basic.js");
module.exports = Character;

function Character(user, sio, refGame, gameClassic, positionHtml) {
    "use strict";
    this.io = sio;
    this.user = user;
    this.refGame = refGame;
    this.gameClassic = gameClassic;
    this.health = {current: 1000, max: 2500, regeneration: 45};
    this.mana = {current: 350, max: 800, regeneration: 30};
    this.speed = 0.100;
    this.position = {x: (30 + 60 * 5), y: (30 + 60 * 3)};
    this.orientation = 40; //bot
    this.deplacement = new MovementCharacter(this);
    this.bomb = {};
    this.positionHtml = positionHtml;
    this.nbMaxBomb = 1;
    this.nbCurrentBomb = 0;
    this.powder = 2;
    var bombManager = this.gameClassic.bombManager;

    this.timer = setInterval(function () {
        var someHealth = this.health.regeneration * 200 / 1000;
        var someMana = this.mana.regeneration * 200 / 1000;

        if (this.health.current + someHealth > this.health.max) {
            this.health.current = this.health.max;
        } else {
            this.health.current += someHealth;
        }
        if (this.mana.current + someMana > this.mana.max) {
            this.mana.current = this.mana.max;
        } else {
            this.mana.current += someMana;
        }

        this.io.sockets.in(this.refGame).emit('update champion', {
            id: this.user.socket.id,
            health: this.health,
            mana: this.mana
        });
    }.bind(this), 200);

    this.user.socket.on("space down", function () {
        bombManager.addBomb(this);
    }.bind(this));
}

Character.prototype = {
    getCell: function (pixelX, pixelY) {
        "use strict";
        return this.gameClassic.env.getCell(pixelX, pixelY);
    },
    stopInterval: function () {
        "use strict";
        clearInterval(this.timer);
        this.deplacement.stopInterval();
    },
    toObject: function () {
        "use strict";
        return {
            id: this.user.socket.id,
            health: this.health,
            mana: this.mana,
            speed: this.speed,
            position: this.position,
            positionHtml: this.positionHtml,
            pseudo: this.user.pseudo
        };
    }
};
