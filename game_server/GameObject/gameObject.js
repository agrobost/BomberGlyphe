var ObserverList = require("../util/observerList.js");
module.exports = GameObject;

function GameObject(scene) {
    "use strict";
    this.position = {};
    this.scene = scene;
    this.observerMovingCell = new ObserverList();

}

GameObject.prototype = {
    //return
    getCell: function () {
        "use strict";
        return this.scene.getCell(this.position);
    },
    getCellObject: function () {
        "use strict";
        return this.scene.getCellObject(this.position);
    },
    addObserver: function (observer) {
        "use strict";
        this.observerMovingCell.add(observer);
        console.log(this.observerMovingCell);
    },
    removeObserver: function (observer) {
        "use strict";
        this.observerMovingCell.removeAt(this.observerMovingCell.indexOf(observer, 0));
    },
    notify: function (param) {
        "use strict";
        var observerCount = this.observerMovingCell.count();
        for (var i = 0; i < observerCount; i++) {
            this.observerMovingCell.get(i).update(param);
        }
    }
};


