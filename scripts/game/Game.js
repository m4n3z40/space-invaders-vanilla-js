var Base = require('class-extend'),
    Input = require('./Input'),
    Player = require('./Player'),
    Enemy = require('./Enemy');

module.exports = Base.extend({

    canvas: null,

    context: null,

    input: null,

    bodies: [],

    loaded: false,

    constructor: function (canvasId, size) {
        var canvas = document.getElementById(canvasId);

        //Optional param
        size = size || {width: 320, height: 480};

        canvas.width = size.width;
        canvas.height = size.height;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    },

    init: function() {
        this.input = new Input();

        this.load();
        this.update();
        console.log('Game started.');
    },

    initPlayer: function() {
        this.bodies.push(new Player(this));

        console.log('Player added.');
    },

    initEnemies: function() {
        for(var i = 0; i < 30; i++) {
            this.bodies.push(new Enemy(this, null, {
                x: (i % 10) * 25 ,
                y: (i % 3) * 25 + 10
            }));
        }

        console.log('Enemies added');
    },

    load: function() {
        this.initPlayer();
        this.initEnemies();

        this.bodies.forEach(function(body) {
            body.load();
        });

        this.loaded = true;
        console.log('Game loaded.');
    },

    update: function() {
        this.bodies.forEach(function(body) {
            body.update();
        });

        this.draw();

        window.requestAnimationFrame(this.update.bind(this));
    },

    draw: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bodies.forEach(function(body) {
            body.draw();
        });
    }

});