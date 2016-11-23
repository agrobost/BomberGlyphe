module.exports = MovementCharacter;

function MovementCharacter(character) {
    "use strict";
    var RATE = 10;
    var nextDirection = -1;
    var scene = character.scene;
    var updateClient = false;

    var updatePosition = function (nextCellObject, nextPosition) {
        if (nextCellObject && nextCellObject.isWalkable()) {
            var currentCell = character.getCell();
            var nextCell = scene.getCell(nextPosition);
            if (nextCell.column !== currentCell.column || nextCell.line !== currentCell.line) {
                character.notify({previousCell:currentCell, currentCell:nextCell});
            }
            character.position.x = nextPosition.x;
            character.position.y = nextPosition.y;
            if (!updateClient) {
                updateClient = true;
                character.io.sockets.in(character.refGame).emit("update champion", {
                    id: character.user.socket.id,
                    hasBeenChanged: updateClient
                });
            }
        } else {
            updateClient = false;
            character.io.sockets.in(character.refGame).emit("update champion", {
                id: character.user.socket.id,
                hasBeenChanged: updateClient
            });
        }
    };
    var findNextPosition_left = function (nextPosition) {
        var nextCellObject;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.y - scene.sizeCell / 2) / scene.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.x -= character.speed * RATE;
            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * scene.sizeCell) - character.position.y + scene.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.y += realDistance;
            }
        })();
        var nextPositionLeft = {x:nextPosition.x - scene.sizeCell / 2,y:nextPosition.y};
        nextCellObject = scene.getCellObject(nextPositionLeft);
        updatePosition(nextCellObject, nextPosition);
    };
    var findNextPosition_top = function (nextPosition) {
        var nextCellObject;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.x - scene.sizeCell / 2) / scene.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.y -= character.speed * RATE;

            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * scene.sizeCell) - character.position.x + scene.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.x += realDistance;
            }
        })();
        var nextPositionTop = {x:nextPosition.x,y:nextPosition.y - scene.sizeCell / 2};
        nextCellObject = scene.getCellObject(nextPositionTop);
        updatePosition(nextCellObject, nextPosition);
    };
    var findNextPosition_right = function (nextPosition) {
        var nextCellObject;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.y - scene.sizeCell / 2) / scene.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.x += character.speed * RATE;

            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * scene.sizeCell) - character.position.y + scene.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.y += realDistance;
            }
        })();
        var nextPositionRight = {x:nextPosition.x + scene.sizeCell / 2,y:nextPosition.y};
        nextCellObject = scene.getCellObject(nextPositionRight);
        updatePosition(nextCellObject, nextPosition);
    };
    var findNextPosition_bottom = function (nextPosition) {
        var nextCellObject;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.x - scene.sizeCell / 2) / scene.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.y += character.speed * RATE;

            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * scene.sizeCell) - character.position.x + scene.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.x += realDistance;
            }
        })();
        var nextPositionBottom = {x:nextPosition.x,y:nextPosition.y + scene.sizeCell / 2};
        nextCellObject = scene.getCellObject(nextPositionBottom);
        updatePosition(nextCellObject, nextPosition);
    };

    var timer = setInterval(function () {
        var nextPosition = Object.create(character.position);
        switch (nextDirection) {
            case 37:
                findNextPosition_left(nextPosition);
                break;
            case 38:
                findNextPosition_top(nextPosition);
                break;
            case 39:
                findNextPosition_right(nextPosition);
                break;
            case 40:
                findNextPosition_bottom(nextPosition);
                break;
        }
    }, RATE);

    var timer2 = setInterval(function () {
        character.io.sockets.in(character.refGame).emit("update champion", {
            id: character.user.socket.id,
            position: character.position
        });
        character.io.sockets.in(character.refGame).emit("update champion", {
            id: character.user.socket.id,
            debug: character.position
        });
    }, 200);

    this.stopInterval = function () {
        clearInterval(timer);
        clearInterval(timer2);
    };
    character.user.socket.on("next direction", function (nd) {
        nextDirection = nd;
        character.io.sockets.in(character.refGame).emit("update champion", {
            id: character.user.socket.id,
            nextDirection: nextDirection
        });
    });
}