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
        this.load.image('table', 'assets/CenterTable.png') 
    }

    create ()
    {
        this.background = this.add.image(400, 300, 'background');    // add image
        this.table = this.add.image(400, 300, 'table');

        this.input.manager.enabled = true;  // get controls enabled

        this.input.once('pointerdown', function (){this.scene.start('sceneC'); }, this);
    }

    update ()
    {
        // enter updates here
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
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);
