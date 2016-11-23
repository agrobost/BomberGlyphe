var BasicCell = require("./cell/basic.js");
var BrickCell = require("./cell/brick.js");
var WoodCell = require("./cell/wood.js");
module.exports = Scene;

function Scene() {
    "use strict";
    this.map = [];
    this.numberColumn = 32;
    this.numberLine = 16;
    this.sizeCell = 60;
    this.initialize();
}
Scene.prototype = {
    initialize: function () {
        "use strict";
        var random;
        for (var i = 0; i < this.numberColumn; i++) {
            this.map[i] = [];
            for (var j = 0; j < this.numberLine; j++) {
                random = Math.random();
                if (random < 0.25) {
                    this.map[i][j] = new BrickCell(i,j);
                } else if (random < 0.50) {
                    this.map[i][j] = new WoodCell(i,j);
                } else {
                    this.map[i][j] = new BasicCell(i,j);
                }
            }
        }
        this.map[5][3] = new BasicCell(5,3);
    },
    getCellObject: function (position) {
        "use strict";
        var cell = this.getCell({x:position.x,y:position.y});
        return cell ? this.map[cell.column][cell.line] : undefined;
    },
    getCell : function (position) {
        "use strict";
        var belongTopMap = function (column, line) {
            if (column >= 0 && column < this.numberColumn && line >= 0 && line < this.numberLine) {
                return true;
            } else {
                return false;
            }
        }.bind(this);
        var column = Math.floor(position.x / this.sizeCell);
        var line = Math.floor(position.y / this.sizeCell);
        return belongTopMap(column, line) ? {column:column,line:line} : undefined;
    },
    getCenterPositionOf:function(position){
        "use strict";
        return {x:this.sizeCell*position.x+this.sizeCell/2,y:this.sizeCell*position.y+this.sizeCell/2};
    },
    update : function(data){
        console.log("previous cell : "+data.previousCell.column+"/"+data.previousCell.line+", currentCell"+data.currentCell.column+"/"+data.currentCell.line);
    }
};

