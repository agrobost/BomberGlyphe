var Basic = require("./Basic.js");
module.exports = WoodCell;

function WoodCell(column, line) {
    "use strict";
    Basic.call(this, column, line);
    this.type = "wood";
}
WoodCell.prototype = Object.create(Basic.prototype);
WoodCell.prototype = {
    constructor: WoodCell,
    isWalkable: function () {
        "use strict";
        return false;
    }
};
