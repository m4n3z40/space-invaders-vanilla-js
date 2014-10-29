var Base = require('class-extend');

/**
 * @class {Input}
 */
var Input = module.exports = Base.extend({

    /**
     * @type {Object}
     */
    currentKeys: {},

    /**
     * Construtor da classe
     */
    constructor: function() {
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    },

    /**
     * Executado quando uma tecla deixa de ser pressionada
     *
     * @param {DOMException} e
     */
    onKeyUp: function(e) {
        this.currentKeys[e.keyCode] = false;
    },

    /**
     * Executado quando uma tecla é pressionada
     *
     * @param {DOMException} e
     */
    onKeyDown: function(e) {
        this.currentKeys[e.keyCode] = true;
    },

    /**
     * Retorna um indicador se a tecla para mover para esquerda foi pressionada
     *
     * @returns {boolean}
     */
    isLeftPressed: function() {
        var leftKey = Input.LEFT,
            currKeys = this.currentKeys;

        return leftKey in currKeys && currKeys[leftKey] === true;
    },

    /**
     * Retorna um indicador se a tecla para mover para direita foi pressionada
     *
     * @returns {boolean}
     */
    isRightPressed: function() {
        var rightKey = Input.RIGHT,
            currKeys = this.currentKeys;

        return rightKey in currKeys && currKeys[rightKey] === true;
    },

    /**
     * Retorna um indicador se a tecla para executar ação principal foi pressionada
     *
     * @returns {boolean}
     */
    isActionPressed: function() {
        var actionKey = Input.SPACE,
            currKeys = this.currentKeys;

        return actionKey in currKeys && currKeys[actionKey] === true;
    }

}, {

    /**
     * @type {int}
     */
    SPACE: 32,

    /**
     * @type {int}
     */
    LEFT: 37,

    /**
     * @type {int}
     */
    RIGHT: 39

});