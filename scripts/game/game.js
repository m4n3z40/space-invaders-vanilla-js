function Game(canvasId, size) {
    var canvas = document.getElementById(canvasId);

    //Optional param
    size = size || {width: 320, height: 480};

    canvas.width = size.width;
    canvas.height = size.height;

    this.canvas = canvas;
}

Game.prototype.init = function() {
    console.log('Game started.');
};

module.exports = Game;