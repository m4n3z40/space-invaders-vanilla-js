var Body = require('./Body');

/**
 * @class {Bullet}
 * @extend {Body}
 */
var Bullet = module.exports = Body.extend({

    /**
     * @type {int}
     */
    speed: 5,

    /**
     * @type {string}
     */
    direction: 'down',

    /**
     * Construtor da classe
     *
     * @param {Game} game
     * @param {Object} size
     * @param {Object} initialPosition
     * @param {string} direction
     */
    constructor: function(game, size, initialPosition, direction) {
        size = size || {width: 2, height: 5};

        if (direction) this.direction = direction;

        Bullet.__super__.constructor.call(this, game, size, initialPosition);
    },

    /**
     * Atualiza o estado deste corpo em cada quadro do gamo
     */
    update: function() {

        this.position.y += this.direction === 'up' ? -this.speed : this.speed;

    }

});