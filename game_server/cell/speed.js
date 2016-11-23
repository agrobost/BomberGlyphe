var Basic = require("./basic.js");
module.exports = Speed;

function Speed(column, line) {
    "use strict";
    Basic.call(this, column, line);
    this.type = "speed";
}
Speed.prototype = Object.create(Basic.prototype);
Speed.prototype.constructor = Speed;

