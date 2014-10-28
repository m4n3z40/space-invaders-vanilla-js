var Body = require('./Body');

var Player = Body.extend({

    constructor: function(game, size, initialPosition) {
        size = size || {width: 30, height: 10};
        initialPosition = initialPosition || {x: (game.canvas.width / 2) - (size.width / 2), y: game.canvas.height - size.height - 10};

        Player.__super__.constructor.call(this, game, size, initialPosition);
    },

    update: function() {

        if (this.game.input.isLeftPressed() && this.position.x > 0) {
            this.position.x -= 3;
        }

        if (this.game.input.isRightPressed() && this.game.canvas.width > this.position.x + this.size.width) {
            this.position.x += 3;
        }

    }

});

module.exports = Player;