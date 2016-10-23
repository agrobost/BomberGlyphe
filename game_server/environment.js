var BasicCell = require("./cell/Basic.js");
var BrickCell = require("./cell/Brick.js");
var WoodCell = require("./cell/Wood.js");
module.exports = Environment;

function Environment() {
    "use strict";
    this.map = [];
    this.numberColumn = 32;
    this.numberLine = 16;
    this.sizeCell = 60;
    this.initialize();
}
Environment.prototype = {
    initialize: function () {
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
    },
    getCell: function (pixelX, pixelY) {
        "use strict";
        var belongTopMap = function (column, line) {
            if (column >= 0 && column < this.numberColumn && line >= 0 && line < this.numberLine) {
                return true;
            } else {
                return false;
            }
        }.bind(this);
        var x = Math.floor(pixelX / this.sizeCell);
        var y = Math.floor(pixelY / this.sizeCell);
        return belongTopMap(x, y) ? this.map[x][y] : undefined;
    }
};

