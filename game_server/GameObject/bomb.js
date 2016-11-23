var GameObject = require("./gameObject.js");
module.exports = Bomb;

function Bomb(scene, cell) {
    "use strict";
    this.position = scene.getCenterPositionOf(cell);

    GameObject.call(this, scene);
}
Bomb.prototype = Object.create(GameObject.prototype);

