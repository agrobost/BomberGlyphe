var Basic = require("./basic.js");
module.exports = ExtraBomb;

function ExtraBomb(column, line) {
    "use strict";
    Basic.call(this, column, line);
    this.type = "extra_bomb";
}
ExtraBomb.prototype = Object.create(Basic.prototype);
ExtraBomb.prototype.constructor = ExtraBomb;