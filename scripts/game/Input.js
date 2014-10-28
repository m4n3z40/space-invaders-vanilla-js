var Base = require('class-extend');

var Input = Base.extend({

    currentKey: null,

    constructor: function() {
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    },

    onKeyUp: function() {
        this.currentKey = null;
    },

    onKeyDown: function(e) {
        this.currentKey = e.keyCode;
    },

    isLeftPressed: function() {
        return this.currentKey === Input.LEFT;
    },

    isRightPressed: function() {
        return this.currentKey === Input.RIGHT;
    },

    isActionPressed: function() {
        return this.currentKey === Input.SPACE;
    }

}, {

    SPACE: 32,

    LEFT: 37,

    RIGHT: 39
    
});

module.exports = Input;