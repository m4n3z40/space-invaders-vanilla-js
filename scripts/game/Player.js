var Body = require('./Body'),
    Bullet = require('./Bullet');

var Player = module.exports = Body.extend({

    speed: 3,

    fireDelay: 120,

    isFiring: false,

    constructor: function(game, size, initialPosition) {
        size = size || {width: 30, height: 10};
        initialPosition = initialPosition || {x: (game.canvas.width / 2) - (size.width / 2), y: game.canvas.height - size.height - 10};

        Player.__super__.constructor.call(this, game, size, initialPosition);
    },

    update: function() {
        var me = this,
            input = me.game.input;

        if (input.isLeftPressed() && me.position.x > 0) {
            me.position.x -= me.speed;
        }

        if (input.isRightPressed() && me.game.canvas.width > me.position.x + me.size.width) {
            me.position.x += me.speed;
        }

        if (input.isActionPressed() && !me.isFiring) {
            me.game.bodies.push(new Bullet(
                me.game,
                null,
                {x: me.position.x + me.size.width / 2, y: me.position.y - 5},
                'up'
            ));

            me.isFiring = true;

            setTimeout(function() {
                me.isFiring = false;
            }, me.fireDelay)
        }
    }

});