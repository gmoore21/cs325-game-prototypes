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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var score2 = 0;  // myself
var gameOver = false;
var scoreText;
var scoreText2;     // myself

var player2;  // Added myself
var Wkey;
var Akey;
var Dkey;

///


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude1', 'assets/dude1.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude2', 'assets/dude2.png', { frameWidth: 32, frameHeight: 48 });  // Adding dude 2
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude1');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
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

    // The player2 and its settings
    player2 = this.physics.add.sprite(200, 450, 'dude2');

    //  Player2 physics properties. Give the little guy a slight bounce.
    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);

    //  Our player2 animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'dude2', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('dude2', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    //cursors2 = this.input.keyboard.addCapture('W,A,D'); // ADD these keys (MYself)
    Wkey = this.input.keyboard.addKey('W');  // Get key object
    Akey = this.input.keyboard.addKey('A');  // Get key object
    Dkey = this.input.keyboard.addKey('D');  // Get key object

    //var isDown = keyObj.isDown;
    //var isUp = keyObj.isUp;

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'Player 1: 0', { fontSize: '32px', fill: '#000' });
    scoreText2 = this.add.text(400, 16, 'Player 2: 0', { fontSize: '32px', fill: '#000' });  // Added myself

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player2, platforms);  // ADDED MYSELF

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    /// Added myslef

    this.physics.add.overlap(player2, stars, collectStar2, null, this);

    this.physics.add.collider(player2, bombs, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        // player 1 wins
        if(score>score2){
           scoreText = this.add.text(300, 250, 'Player 1 wins!', { fontSize: '64px', fill: '#000' }); 
        }
        if(score<score2){
           scoreText = this.add.text(300, 250, 'Player 2 wins!', { fontSize: '64px', fill: '#000' }); 
        }
        return;
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

    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    /////  ADDED MYself

    if (Akey.isDown)
    {
        player2.setVelocityX(-160);

        player2.anims.play('left2', true);
    }
    else if (Dkey.isDown)
    {
        player2.setVelocityX(160);

        player2.anims.play('right2', true);
    }
    else
    {
        player2.setVelocityX(0);

        player2.anims.play('turn2');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    if (Wkey.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-330);
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Player 1: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function collectStar2 (player2, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score2 += 10;
    scoreText2.setText('Player 2: ' + score2);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player2.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
