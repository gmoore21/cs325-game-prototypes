var cantWalk;
var player;
var dog;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

class SceneA extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneA' });       // key of Start Screen
    }

    preload ()
    {
        this.load.image('StartScreen', 'assets/StartScreen.png');   // add the Screen
    }

    create ()
    {
        this.StartScreen = this.add.image(400, 300, 'StartScreen');    // add image

        this.input.manager.enabled = true;  // get controls enabled

        this.input.once('pointerdown', function () {

            this.scene.start('sceneB'); // start the second game state

        }, this);
    }

}

class SceneB extends Phaser.Scene {


    constructor ()
    {
        super({ key: 'sceneB' });
    }

    preload ()
    {
        this.load.image('background', 'assets/Background.png');
        this.load.image('table', 'assets/CenterTable.png');
        this.load.image('couch', 'assets/Couch.png');
        this.load.image('couch2', 'assets/Couch2.png');
        this.load.image('bar', 'assets/Bar.png');
        this.load.image('TV', 'assets/TV.png');
    }

    create ()
    {
        this.background = this.add.image(400, 300, 'background');    // add image

        cantWalk = this.physics.add.staticGroup();

        cantWalk.create(400, 300, 'table');
        cantWalk.create(400, 125, 'couch');
        cantWalk.create(200, 300, 'couch2');
        cantWalk.create(600, 550, 'bar');
        cantWalk.create(700, 300, 'TV');

        this.input.manager.enabled = true;  // get controls enabled

             player = this.physics.add.sprite(100, 450, 'dude1');
        player.setCollideWorldBounds(true);

        this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude1', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude1', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude1', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    //  The score
    scoreText = this.add.text(16, 16, 'Cats Caught: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);

        this.input.once('pointerdown', function (){this.scene.start('sceneC'); }, this);
    }

    update ()
    {
        // enter updates here

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else if (cursors.up.isDown)
    {
        player.setVelocityY(-160);

    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(160);

    }

   // else{
    //    player.setVelocity(0);
    //}

    }

}

class SceneC extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneC' });
    }

    preload ()
    {
        this.load.image('EndScreen', 'assets/EndScreen.png');
    }

    create ()
    {
        this.EndScreen = this.add.image(400, 300, 'EndScreen');    // add image

        this.input.manager.enabled = true;  // get controls enabled

        this.input.once('pointerdown', function () {

            this.scene.start('sceneA'); // start the first game state

        }, this);
    }

}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);
