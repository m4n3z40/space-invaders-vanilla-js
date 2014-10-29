var Body = require('./Body'),
    Bullet = require('./Bullet');

/**
 * @class {Enemy}
 * @extend {Body}
 */
var Enemy = module.exports = Body.extend({

    /**
     * @type {int}
     */
    speed: 1,

    /**
     * @type {float}
     */
    patrolX: 0,

    /**
     * Construtor da classe
     *
     * @param {Game} game
     * @param {Object} size
     * @param {Object} initialPosition
     */
    constructor: function(game, size, initialPosition) {
        size = size || {width: 15, height: 15};

        Enemy.__super__.constructor.call(this, game, size, initialPosition);
    },

    /**
     * Atualiza o estado deste corpo em cada quadro do gamo
     */
    update: function() {
        if (this.patrolX < 0 || this.patrolX > 80) {
            this.speed = -this.speed;
        }

        if (Math.random() > 0.995 && !this.alliedBellow()) {
            this.shoot();
        }

        this.position.x += this.speed;
        this.patrolX += this.speed;
    },

    /**
     * Retorna se há um aliado abaixo deste inimigo
     *
     * @returns {boolean}
     */
    alliedBellow: function() {
        var invader = this;

        return this.game.bodies.filter(function(b) {
            return b instanceof Enemy &&
                   Math.abs(invader.position.x - b.position.x) < b.size.width &&
                   b.position.y > invader.position.y;
        }).length > 0;
    },

    /**
     * Adiciona um corpo de Bullet ao game, dando efeito de tiro para cima
     */
    shoot: function() {
        this.game.addBody(new Bullet(
            this.game,
            null,
            {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height + 5}
        ));
    },

    /**
     * Executado quando o corpo é destruido
     */
    onDestroyed: function() {
        if (--Enemy.enemiesLeft <= 0) {
            Enemy.onDestroyedAll();
        }
    }

},{
    /**
     * @type {int}
     * @static
     */
    enemiesLeft: 0,

    /**
     * Executado quando todos os inimigos são destruidos
     * @static
     */
    onDestroyedAll: function() {
        window.alert('Game over! YOU WON \\o/');
    }
});