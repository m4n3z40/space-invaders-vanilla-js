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
        this.addBody(new Player(this));

        console.log('Player added.');
    },

    initEnemies: function() {
        for(var i = 0; i < 30; i++) {
            this.addBody(new Enemy(this, null, {
                x: (i % 10) * 25 ,
                y: (i % 3) * 25 + 10
            }));
        }

        console.log('Enemies added');
    },

    collectGarbage: function() {
        var canvas = this.canvas;

        this.bodies = this.bodies.filter(function(body) {
            return !(body.position.x < -10 ||
                     body.position.x > canvas.width + 10 ||
                     body.position.y < -10 ||
                     body.position.y > canvas.height + 10);
        });
    },

    bodiesCollided: function(bodyA, bodyB) {
        return (
            bodyA !== bodyB &&
            bodyA.position.x < bodyB.position.x + bodyB.size.width &&
            bodyA.position.x + bodyA.size.width > bodyB.position.x &&
            bodyA.position.y < bodyB.position.y + bodyB.size.height &&
            bodyA.size.height + bodyA.position.y > bodyB.position.y
        );
    },

    reportCollisions: function() {
        var total = this.bodies.length,
            collidedPairs = [],
            bodyA,
            bodyB;

        for(var i = 0; i < total; i++) {
            for(var j = i + 1; j < total; j++) {
                bodyA = this.bodies[i];
                bodyB = this.bodies[j];

                if (this.bodiesCollided(bodyA, bodyB)) {
                    collidedPairs.push(bodyA);
                    collidedPairs.push(bodyB);
                }
            }
        }

        collidedPairs.forEach(function(collidedBody) {
            collidedBody.collision();
        });
    },

    addBody: function(body) {
        if (body instanceof Enemy) {
            Enemy.enemiesLeft++;
        }

        this.bodies.push(body);
    },

    removeBody: function(body) {
        var id = this.bodies.indexOf(body);
        if (id < 0) return;

        this.bodies.splice(id, 1);
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

        this.reportCollisions();

        this.collectGarbage();

        window.requestAnimationFrame(this.update.bind(this));
    },

    draw: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bodies.forEach(function(body) {
            body.draw();
        });
    }

});