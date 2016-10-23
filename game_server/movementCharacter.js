module.exports = MovementCharacter;

function MovementCharacter(character) {
    "use strict";
    var RATE = 10;
    var nextDirection = -1;
    var env = character.gameClassic.env;
    var currentCell = character.getCell();
    var updateClient = false;

    var updatePosition = function (nextCell, nextPosition) {
        if (nextCell.isWalkable() || nextCell === currentCell) {
            character.orientation = 37;
            character.position.x = nextPosition.x;
            character.position.y = nextPosition.y;
            //character.checkBonus();

            if (nextCell !== currentCell) {
                //nextCell.applyEffect(character);
                currentCell = nextCell;
            }
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
        var nextCell;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.y - env.sizeCell / 2) / env.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.x -= character.speed * RATE;
            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * env.sizeCell) - character.position.y + env.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.y += realDistance;
            }
        })();
        nextCell = env.getCell(nextPosition.x - env.sizeCell / 2, nextPosition.y);
        updatePosition(nextCell, nextPosition);
    };
    var findNextPosition_top = function (nextPosition) {
        var nextCell;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.x - env.sizeCell / 2) / env.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.y -= character.speed * RATE;

            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * env.sizeCell) - character.position.x + env.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.x += realDistance;
            }
        })();
        nextCell = env.getCell(nextPosition.x, nextPosition.y - env.sizeCell / 2);
        updatePosition(nextCell, nextPosition);
    };
    var findNextPosition_right = function (nextPosition) {
        var nextCell;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.y - env.sizeCell / 2) / env.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.x += character.speed * RATE;

            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * env.sizeCell) - character.position.y + env.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.y += realDistance;
            }
        })();
        nextCell = env.getCell(nextPosition.x + env.sizeCell / 2, nextPosition.y);
        updatePosition(nextCell, nextPosition);
    };
    var findNextPosition_bottom = function (nextPosition) {
        var nextCell;
        (function () {
            var x, roundX, sign, max, realDistance;
            x = (character.position.x - env.sizeCell / 2) / env.sizeCell;
            roundX = Math.round(x);
            if (x === roundX) {
                nextPosition.y += character.speed * RATE;

            } else {
                sign = (roundX - x) / Math.abs(roundX - x);
                max = (roundX * env.sizeCell) - character.position.x + env.sizeCell / 2;
                realDistance = Math.abs(sign * character.speed * RATE) < Math.abs(max) ? sign * character.speed * RATE : max;
                nextPosition.x += realDistance;
            }
        })();
        nextCell = env.getCell(nextPosition.x, nextPosition.y + env.sizeCell / 2);
        updatePosition(nextCell, nextPosition);
    };

    var timer = setInterval(function () {
        var nextPosition = Object.assign({}, character.position);
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
};