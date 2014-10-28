var Body = require('./Body');

var Bullet = module.exports = Body.extend({

    speed: 5,

    direction: 'down',

    constructor: function(game, size, initialPosition, direction) {
        size = size || {width: 2, height: 5};

        if (direction) this.direction = direction;

        Bullet.__super__.constructor.call(this, game, size, initialPosition);
    },

    update: function() {

        this.position.y += this.direction === 'up' ? -this.speed : this.speed;

    }

});