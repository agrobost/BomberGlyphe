module.exports = Basic;

function Basic(column, line) {
    "use strict";
    this.column = column;
    this.line = line;
    this.type = "empty";
}

Basic.prototype.isWalkable = function () {
    "use strict";
    return true;
};







