function Game(canvasId, size) {
    var canvas = document.getElementById(canvasId);
    canvas.width = size.width;
    canvas.height = size.height;

    this.canvas = canvas;
}

Game.prototype.init = function() {
    console.log('Game started.');
};

module.exports = Game;