module.exports = ObserverList;

function ObserverList() {
    "use strict";
    this.observerList = [];
}

ObserverList.prototype = {
    add: function (obj) {
        "use strict";
        return this.observerList.push(obj);
    },
    count: function () {
        "use strict";
        return this.observerList.length;
    },
    get: function (index) {
        "use strict";
        if (index > -1 && index < this.observerList.length) {
            return this.observerList[index];
        }
    },
    indexOf: function (obj, startIndex) {
        "use strict";
        var i = startIndex;

        while (i < this.observerList.length) {
            if (this.observerList[i] === obj) {
                return i;
            }
            i++;
        }
        return -1;
    },
    removeAt: function (index) {
        "use strict";
        this.observerList.splice(index, 1);
    }
};