var Base = require('class-extend');

var Input = module.exports = Base.extend({

    currentKeys: {},

    constructor: function() {
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    },

    onKeyUp: function(e) {
        this.currentKeys[e.keyCode] = false;
    },

    onKeyDown: function(e) {
        this.currentKeys[e.keyCode] = true;
    },

    isLeftPressed: function() {
        var leftKey = Input.LEFT,
            currKeys = this.currentKeys;

        return leftKey in currKeys && currKeys[leftKey] === true;
    },

    isRightPressed: function() {
        var rightKey = Input.RIGHT,
            currKeys = this.currentKeys;

        return rightKey in currKeys && currKeys[rightKey] === true;
    },

    isActionPressed: function() {
        var actionKey = Input.SPACE,
            currKeys = this.currentKeys;

        return actionKey in currKeys && currKeys[actionKey] === true;
    }

}, {

    SPACE: 32,

    LEFT: 37,

    RIGHT: 39

});