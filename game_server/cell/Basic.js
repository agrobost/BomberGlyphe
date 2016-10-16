module.exports = Basic;

function Basic(column, line) {
    "use strict";
    this.column = column;
    this.line = line;
    this.type = "empty";
}

Basic.getPosition = function () {
    "use strict";
    return {column: this.column, line: this.line};
};
Basic.prototype.isWalkable = function(){
    "use strict";
    return true;
};







