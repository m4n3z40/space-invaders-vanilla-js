var Body = require('./Body'),
    Bullet = require('./Bullet');

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

        if (Math.random() > 0.995 && !this.alliedBellow()) {
            this.game.bodies.push(new Bullet(
                this.game,
                null,
                {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height + 5}
            ));
        }
    },

    alliedBellow: function() {
        var invader = this;

        return this.game.bodies.filter(function(b) {
            return b instanceof Enemy &&
                   Math.abs(invader.position.x - b.position.x) < b.size.width &&
                   b.position.y > invader.position.y;
        }).length > 0;
    }

});