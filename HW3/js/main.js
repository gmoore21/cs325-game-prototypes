var cantWalk;
var player;
var dogs;
var cats;
var cursors;
var score = 0;
var time = 0;
var numCat = 0;
var timeText;
var gameOver = false;
var scoreText;

// WHY ISNT THIS WORKING
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

    score = 0;
    time = 0;
    numCat = 0;
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
        this.load.image('cat', 'assets/catchCat.png');
        this.load.image('dog', 'assets/Dog.png');

        this.load.spritesheet('dude1', 'assets/dude1.png', { frameWidth: 32, frameHeight: 48 });
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
    //timeText = this.add.text(400, 16, 'Time Elapsed: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, cantWalk);

    cats = this.physics.add.group();

    this.physics.add.collider(cats, cantWalk);
    this.physics.add.collider(player, cats, hitCat, null, this);

    dogs = this.physics.add.group();

    this.physics.add.collider(dogs, cantWalk);
    this.physics.add.collider(dogs, cats, hitCat2, null, this);
    this.physics.add.collider(dogs, player, dead, null, this);

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    var y = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    var z = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var cat = cats.create(x, 16, 'cat');    // create dogs
    cat.setBounce(1);
    cat.setCollideWorldBounds(true);
    cat.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat.allowGravity = false;

    var cat2 = cats.create(y, 16, 'cat');    // create dogs
    cat2.setBounce(1);
    cat2.setCollideWorldBounds(true);
    cat2.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat2.allowGravity = false;

    var cat3 = cats.create(z, 16, 'cat');    // create dogs
    cat3.setBounce(1);
    cat3.setCollideWorldBounds(true);
    cat3.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat3.allowGravity = false;

    var cat4 = cats.create(x, 16, 'cat');    // create dogs
    cat4.setBounce(1);
    cat4.setCollideWorldBounds(true);
    cat4.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat4.allowGravity = false;

    var cat5 = cats.create(y, 16, 'cat');    // create dogs
    cat5.setBounce(1);
    cat5.setCollideWorldBounds(true);
    cat5.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat5.allowGravity = false;

    var cat6 = cats.create(z, 16, 'cat');    // create dogs
    cat6.setBounce(1);
    cat6.setCollideWorldBounds(true);
    cat6.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat6.allowGravity = false;

    var cat7 = cats.create(z, 16, 'cat');    // create dogs
    cat7.setBounce(1);
    cat7.setCollideWorldBounds(true);
    cat7.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat7.allowGravity = false;

    var cat7 = cats.create(x, 16, 'cat');    // create dogs
    cat7.setBounce(1);
    cat7.setCollideWorldBounds(true);
    cat7.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat7.allowGravity = false;

    var cat8 = cats.create(y, 16, 'cat');    // create dogs
    cat8.setBounce(1);
    cat8.setCollideWorldBounds(true);
    cat8.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat8.allowGravity = false;

    var cat9 = cats.create(z, 16, 'cat');    // create dogs
    cat9.setBounce(1);
    cat9.setCollideWorldBounds(true);
    cat9.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat9.allowGravity = false;

    var cat10 = cats.create(z, 16, 'cat');    // create dogs
    cat10.setBounce(1);
    cat10.setCollideWorldBounds(true);
    cat10.setVelocity(Phaser.Math.Between(-200, 200), 20);
    cat10.allowGravity = false;

    var dog = dogs.create(x, 16, 'dog');    // create dogs
    dog.setBounce(1);
    dog.setCollideWorldBounds(true);
    dog.setVelocity(Phaser.Math.Between(-200, 200), 20);
    dog.allowGravity = false;

    /*
    var dog1 = dogs.create(x, 16, 'dog');    // create dogs
    dog1.setBounce(1);
    dog1.setCollideWorldBounds(true);
    dog1.setVelocity(Phaser.Math.Between(-200, 200), 20);
    dog1.allowGravity = false;

    var dog2 = dogs.create(x, 16, 'dog');    // create dogs
    dog2.setBounce(1);
    dog2.setCollideWorldBounds(true);
    dog2.setVelocity(Phaser.Math.Between(-200, 200), 20);
    dog2.allowGravity = false;
    */




        this.input.once('pointerdown', function (){this.scene.start('sceneC'); }, this);
    }

    update ()
    {
        // enter updates here

    if((score==10)||(numCat == 10)){
        this.scene.start('sceneC');
    }

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

   else{
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('turn');
    }

    //time = this.game.time.getElapsedSeconds();
    //timeText.setText('Time Elapsed: ' + time);
    }

    //scoreText.setText('Cats Caught: ' + score);

    //time = this.game.time.totalElapsedSeconds(), 32, 32);
    //timeText.setText('Time Elapsed: ' + time);
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


function hitCat (player, dog)
{

    dog.disableBody(true,true);

    score += 1;
    scoreText.setText('Cats Caught: ' + score);
    numCat = numCat +1;

    gameOver = true;

    // put code to go to end scene
}


function hitCat2 (dog, cat)
{

    cat.disableBody(true,true);
    numCat = numCat + 1;

}

function dead (dog, player){

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');
}

