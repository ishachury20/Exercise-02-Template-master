// Exercise 02: RNGolf
// Name:
// Date:

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    scene: [ Play ],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 100 },
            debug: true
        }
    },
}

let game = new Phaser.Game(config)

let { width, height } = game.config