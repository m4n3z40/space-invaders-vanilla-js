var Body = require('./Body'),
    Bullet = require('./Bullet');

/**
 * @class {Player}
 * @extend {Body}
 */
var Player = module.exports = Body.extend({

    /**
     * @type {int}
     */
    speed: 3,

    /**
     * @type {int}
     */
    fireDelay: 120,

    /**
     * @type {boolean}
     */
    isFiring: false,

    /**
     * Construtor da classe
     *
     * @param {Game} game
     * @param {Object} size
     * @param {Object} initialPosition
     */
    constructor: function(game, size, initialPosition) {
        size = size || {width: 30, height: 10};
        initialPosition = initialPosition || {x: (game.canvas.width / 2) - (size.width / 2), y: game.canvas.height - size.height - 10};

        Player.__super__.constructor.call(this, game, size, initialPosition);
    },

    /**
     * Atualiza o estado deste corpo em cada quadro do gamo
     */
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
            this.shoot();
        }
    },

    /**
     * Adiciona um corpo de Bullet ao game, dando efeito de tiro para cima
     */
    shoot: function() {
        var me = this;

        me.game.addBody(new Bullet(
            me.game,
            null,
            {x: me.position.x + me.size.width / 2, y: me.position.y - 5} ,
            'up'
        ));

        me.isFiring = true;

        setTimeout(function() {
            me.isFiring = false;
        }, me.fireDelay);

        this.game.playSound('shoot');
    },

    /**
     * Executado quando o corpo é destruido
     */
    onDestroyed: function() {
        window.alert('Game over! You lost :(');
    }

});