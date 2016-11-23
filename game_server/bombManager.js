//var Bomb2 = require("./bomb.js");
module.exports = BombManager;

function BombManager() {
    this.mana = 20;
}

BombManager.prototype = {
    addBomb: function (character) {
        "use strict";
        var scene = character.gameClassic.scene;
        var cell = scene.getCell(character.position.x, character.position.y);
        if (cell && cell.type !== "empty") {
            return;
        }
        if (character.mana.current < 20) {
            return;
        }
        if (character.nbCurrentBomb >= character.nbMaxBomb) {
            return;

        }
        character.mana.current -= this.mana;
        character.nbCurrentBomb++;
        //new Bomb2(character, cell);
    }
};


