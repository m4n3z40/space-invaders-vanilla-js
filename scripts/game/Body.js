var Base = require('class-extend');

module.exports = Base.extend({

    game: null,

    size: null,

    position: null,

    speed: 0,

    constructor: function(game, size, initialPosition) {
        this.game = game;
        this.size = size;
        this.position = initialPosition;
    },

    load: function() {

    },

    collision: function() {
        this.game.removeBody(this);

        this.onDestroyed && this.onDestroyed();
    },

    update: function() {

    },

    draw: function() {
        this.game.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

});