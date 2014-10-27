var Game = require('./game/game');

var gameInstance = new Game('gameCanvas', {width: 320, height: 480});

gameInstance.init();