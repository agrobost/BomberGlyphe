var Basic = require("./basic.js");
module.exports = Powder;

function Powder(column, line) {
    "use strict";
    Basic.call(this, column, line);
    this.type = "powder";
}
Powder.prototype = Object.create(Basic.prototype);
Powder.prototype.constructor = Powder;

