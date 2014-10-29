var Base = require('class-extend'),
    Input = require('./Input'),
    Player = require('./Player'),
    Enemy = require('./Enemy');

/**
 * @class {Game}
 */
module.exports = Base.extend({

    /**
     * @type {HTMLCanvasElement}
     */
    canvas: null,

    /**
     * @type {CanvasRenderingContext2D}
     */
    context: null,

    /**
     * @type {Input}
     */
    input: null,

    /**
     * @type {Array}
     */
    bodies: [],

    /**
     * @type {Object}
     */
    sounds: {},

    /**
     * @type {boolean}
     */
    loaded: false,

    /**
     *
     * @param {string} canvasId
     * @param {Object} size
     */
    constructor: function (canvasId, size) {
        var canvas = document.getElementById(canvasId);

        //Optional param
        size = size || {width: 320, height: 480};

        canvas.width = size.width;
        canvas.height = size.height;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    },

    /**
     * Inicializa a execução do game
     */
    init: function() {
        this.input = new Input();

        this.load();
        this.update();
        console.log('Game started.');
    },

    /**
     * Inicializa e adiciona o player no game
     */
    initPlayer: function() {
        this.addBody(new Player(this));

        console.log('Player added.');
    },

    /**
     * Inicializa e adiciona os inimigos no game
     */
    initEnemies: function() {
        for(var i = 0; i < 30; i++) {
            this.addBody(new Enemy(this, null, {
                x: (i % 10) * 25 ,
                y: (i % 3) * 25 + 10
            }));
        }

        console.log('Enemies added');
    },

    /**
     * Remove os corpos que estão fora da tela
     */
    collectGarbage: function() {
        var canvas = this.canvas;

        this.bodies = this.bodies.filter(function(body) {
            return !(body.position.x < -10 ||
                     body.position.x > canvas.width + 10 ||
                     body.position.y < -10 ||
                     body.position.y > canvas.height + 10);
        });
    },

    /**
     * Retorna um indicador se os corpos se colidiram no canvas
     *
     * @param bodyA
     * @param bodyB
     * @returns {boolean}
     */
    bodiesCollided: function(bodyA, bodyB) {
        return (
            bodyA !== bodyB &&
            bodyA.position.x < bodyB.position.x + bodyB.size.width &&
            bodyA.position.x + bodyA.size.width > bodyB.position.x &&
            bodyA.position.y < bodyB.position.y + bodyB.size.height &&
            bodyA.size.height + bodyA.position.y > bodyB.position.y
        );
    },

    /**
     * Varre o canvas em busca de colisões
     */
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

    /**
     * Adiciona e carrega um asset de som
     *
     * @param key
     * @param sound
     */
    addSound: function(key, sound) {
        console.log('Adding sound asset: ' + key);

        this.sounds[key] = sound;
    },

    /**
     * Executa o som com o nome requisitado
     *
     * @param key
     */
    playSound: function(key) {
        if (key in this.sounds) {
            this.sounds[key].load();
            this.sounds[key].play();
        }
    },

    /**
     * Adiciona um corpo ao game
     *
     * @param body
     */
    addBody: function(body) {
        if (body instanceof Enemy) {
            Enemy.enemiesLeft++;
        }

        this.bodies.push(body);
    },

    /**
     * Remove um corpo do game
     *
     * @param body
     */
    removeBody: function(body) {
        var id = this.bodies.indexOf(body);
        if (id < 0) return;

        this.bodies.splice(id, 1);
    },

    /**
     * Carrega os elementos que o game precisa para funcionar
     */
    load: function() {
        this.addSound('shoot', document.getElementById('shootSound'));

        this.initPlayer();
        this.initEnemies();

        this.bodies.forEach(function(body) {
            body.load();
        });

        this.loaded = true;
        console.log('Game loaded.');
    },

    /**
     * Atualiza os estados dos corpos em cada frame da execução do game
     */
    update: function() {
        this.bodies.forEach(function(body) {
            body.update();
        });

        this.draw();

        this.reportCollisions();

        this.collectGarbage();

        window.requestAnimationFrame(this.update.bind(this));
    },

    /**
     * Desenha os corpos do game no canvas
     */
    draw: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bodies.forEach(function(body) {
            body.draw();
        });
    }

});