var Basic = require("./Basic.js");
module.exports = Bomb;

function Bomb(column, line){
    "use strict";
    Basic.call(this, column, line);
    this.type = "bomb";
}
Bomb.prototype = Object.create(Basic.prototype);
Bomb.prototype.constructor = Bomb;

