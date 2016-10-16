var BasicCell = require("./cell/Basic.js");
var BrickCell = require("./cell/Brick.js");
var WoodCell = require("./cell/Wood.js");

module.exports = Environment;

function Environment() {
    this.map = [];
    this.numberColumn = 32;
    this.numberLine = 16;
    this.sizeCell = 60;
    this.initialize();
}

Environment.prototype.emitTo = function (user) {
    "use strict";
    user.socket.emit("server sends game env to client", {
        map: this.map,
        numberColumn: this.numberColumn,
        numberLine: this.numberLine,
        sizeCell: this.sizeCell
    });
};

Environment.prototype.initialize = function () {
    "use strict";
    var random;
    for (var i = 0; i < this.numberColumn; i++) {
        this.map[i] = [];
        for (var j = 0; j < this.numberLine; j++) {
            random = Math.random();
            if (random < 0.25) {
                this.map[i][j] = new BrickCell();
            } else if (random < 0.50) {
                this.map[i][j] = new WoodCell();
            } else {
                this.map[i][j] = new BasicCell();
            }
        }
    }
    this.map[5][3] = new BasicCell();
};
Environment.prototype.belongToMap = function (coord) {
    "use strict";
    if (coord.x >= 0 && coord.x <= this.sizeCell * this.numberColumn && coord.y >= 0 && coord.y <= this.sizeCell * this.numberLine) {
        return true;
    } else {
        return false;
    }
};
Environment.prototype.cellBelongToMap = function (column, line) {
    "use strict";
    if (column >= 0 && column < this.numberColumn && line >= 0 && line < this.numberLine) {
        return true;
    } else {
        return false;
    }
};
Environment.prototype.getCell = function (pixelX, pixelY) {
    "use strict";
    var x = Math.floor(pixelX/this.sizeCell);
    var y = Math.floor(pixelY/this.sizeCell);
    return this.cellBelongToMap(x,y) ? this.map[x][y] : undefined;
}
