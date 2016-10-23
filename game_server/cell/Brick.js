var Basic = require("./Basic.js");
module.exports = BrickCell;

function BrickCell(column, line) {
    "use strict";
    Basic.call(this, column, line);
    this.type = "brick";
}
BrickCell.prototype = Object.create(Basic.prototype);
BrickCell.prototype.constructor = BrickCell;

BrickCell.prototype.isWalkable = function () {
    "use strict";
    return false;
};