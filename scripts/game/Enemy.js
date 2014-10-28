var Body = require('./Body');

var Enemy = module.exports = Body.extend({

    speed: 1,

    patrolX: 0,

    constructor: function(game, size, initialPosition) {
        size = size || {width: 15, height: 15};

        Enemy.__super__.constructor.call(this, game, size, initialPosition);
    },

    update: function() {
        if (this.patrolX < 0 || this.patrolX > 80) {
            this.speed = -this.speed;
        }

        this.position.x += this.speed;
        this.patrolX += this.speed;
    }

});