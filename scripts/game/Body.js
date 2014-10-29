var Base = require('class-extend');

/**
 * @class Body
 */
module.exports = Base.extend({

    /**
     * @type {Game}
     */
    game: null,

    /**
     * @type {Object}
     */
    size: null,

    /**
     * @type {Object}
     */
    position: null,

    /**
     * @type {int}
     */
    speed: 0,

    /**
     * Construtor da classe
     *
     * @param {Game} game
     * @param {Object} size
     * @param {Object} initialPosition
     */
    constructor: function(game, size, initialPosition) {
        this.game = game;
        this.size = size;
        this.position = initialPosition;
    },

    /**
     * Carrega os elementos necessários para o objeto ser iniciado
     */
    load: function() {

    },

    /**
     * Executa ação quando este corpo colide com outro
     */
    collision: function() {
        this.game.removeBody(this);

        this.onDestroyed && this.onDestroyed();
    },

    /**
     * Atualiza o estado deste corpo em cada quadro do gamo
     */
    update: function() {

    },

    /**
     * Desenha o corpo no canvas do game
     */
    draw: function() {
        this.game.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

});