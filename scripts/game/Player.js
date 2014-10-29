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
        var input = this.game.input;

        if (input.isLeftPressed() && this.position.x > 0) {
            this.position.x -= this.speed;
        }

        if (input.isRightPressed() && this.game.canvas.width > this.position.x + this.size.width) {
            this.position.x += this.speed;
        }

        if (input.isActionPressed() && !this.isFiring) {
            this.shoot();
        }
    },

    /**
     * Adiciona um corpo de Bullet ao game, dando efeito de tiro para cima
     */
    shoot: function() {
        this.game.addBody(new Bullet(
            this.game,
            null,
            {x: this.position.x + this.size.width / 2, y: this.position.y - 5} ,
            'up'
        ));

        this.game.playSound('shoot');

        this.isFiring = true;

        setTimeout((function() {
            this.isFiring = false;
        }).bind(this), this.fireDelay);
    },

    /**
     * Executado quando o corpo é destruido
     */
    onDestroyed: function() {
        window.alert('Game over! You lost :(');
    }

});