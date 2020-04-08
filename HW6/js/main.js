var cantWalk;
var player;
var score = 0;
var gameOver = false;
var scoreText;
var backgroundMusic;
var GameOversound;

var enemys = null;
var player = null;
var healthpoints = null;
var reticle = null;
var moveKeys = null;
var playerBullets = null;
var enemyBullets = null;
var time = 0;
var enemy = null;
var enemy2 = null;
var enemy3 = null;
var enemy4 = null;
var enemy5 = null;
var hp1 = null;
var hp2 = null;
var hp3 = null;

//// https://phaser.io/examples/v3/view/games/topdownshooter/topdowncombatmechanics

class SceneA extends Phaser.Scene {

    score = 0;
    gameOver = false;

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
    gameOver = false;

    constructor ()
    {
        super({ key: 'sceneB' });
    }

    preload ()
    {
            // NEW CODE ///////

            // Load in images and sprites
        this.load.spritesheet('player_handgun', 'assets/player_walk_strip6.png',
           { frameWidth: 35, frameHeight: 57 }
         ); // Made by tokkatrain: https://tokkatrain.itch.io/top-down-basic-set
        this.load.spritesheet('player_handgun2', 'assets/player2.png',
           { frameWidth: 35, frameHeight: 57 }
         );
        this.load.spritesheet('player_handgunHit', 'assets/player2hit.png',
           { frameWidth: 35, frameHeight: 57 }
         );
        this.load.image('bullet', 'assets/bomb.png');
        this.load.image('target', 'assets/bomb.png');
        this.load.image('background', 'assets/Background.png');

        this.load.image('bar', 'assets/Bar.png');
        this.load.image('barVert', 'assets/BarVert.png');
    }

    create ()
    {

    /////////////////////////////////////////////  new code  ///////////////////////////

    this.physics.world.setBounds(0, 0, 1600, 1200);

    cantWalk = this.physics.add.staticGroup();

    // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

    // Add background player, enemy, reticle, healthpoint sprites
    var background = this.add.image(800, 600, 'background');

    scoreText = this.add.text(200, 100, 'Infected: 0', { fontSize: '64px', fill: '#fff' });

    // Add barriers (Houses)
    cantWalk.create(600, 800, 'bar');
    cantWalk.create(775 , 975, 'barVert')
    cantWalk.create(600, 1150, 'bar');

    cantWalk.create(1000, 200, 'bar');
    cantWalk.create(825 , 375, 'barVert')
    cantWalk.create(1000, 550, 'bar');

    player = this.physics.add.sprite(800, 600, 'player_handgun');
    enemy = this.physics.add.sprite(300, 600, 'player_handgun2');
    enemy.setBounce(1);
    enemy.setCollideWorldBounds(true);
    enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy.allowGravity = false;
    reticle = this.physics.add.sprite(800, 700, 'target');
    //hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
    //hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
   // hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);


//////////// NEWWWW
    enemy2 = this.physics.add.sprite(500, 500, 'player_handgun2');
    enemy2.setBounce(1);
    enemy2.setCollideWorldBounds(true);
    enemy2.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy2.allowGravity = false;

    enemy3 = this.physics.add.sprite(1000, 1000, 'player_handgun2');
    enemy3.setBounce(1);
    enemy3.setCollideWorldBounds(true);
    enemy3.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy3.allowGravity = false;

    enemy4 = this.physics.add.sprite(600, 600, 'player_handgun2');
    enemy4.setBounce(1);
    enemy4.setCollideWorldBounds(true);
    enemy4.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy4.allowGravity = false;


    enemy5 = this.physics.add.sprite(800, 900, 'player_handgun2');
    enemy5.setBounce(1);
    enemy5.setCollideWorldBounds(true);
    enemy5.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy5.allowGravity = false;
    ///////////////////////////////

    // Set image/sprite properties
    background.setOrigin(0.5, 0.5).setDisplaySize(1600, 1200);
    player.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
    enemy.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    enemy2.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    enemy3.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    enemy4.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    enemy5.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);

    // Set that players cant go through walls
    this.physics.add.collider(player, cantWalk);
    this.physics.add.collider(enemy, cantWalk);
    this.physics.add.collider(enemy2, cantWalk);
    this.physics.add.collider(enemy3, cantWalk);
    this.physics.add.collider(enemy4, cantWalk);
    this.physics.add.collider(enemy5, cantWalk);

    // Set sprite variables
    player.health = 3;
    enemy.health = 3;
    enemy.lastFired = 0;
    enemy2.health = 3;
    enemy2.lastFired = 0;
    enemy3.health = 3;
    enemy3.lastFired = 0;
    enemy4.health = 3;
    enemy4.lastFired = 0;
    enemy5.health = 3;
    enemy5.lastFired = 0;


    // Set camera properties
    this.cameras.main.zoom = 0.5;
    this.cameras.main.startFollow(player);

    // Creates object for input with WASD kets
    moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    // Enables movement of player with WASD keys
    this.input.keyboard.on('keydown_W', function (event) {
        player.setAccelerationY(-800);
    });
    this.input.keyboard.on('keydown_S', function (event) {
        player.setAccelerationY(800);
    });
    this.input.keyboard.on('keydown_A', function (event) {
        player.setAccelerationX(-800);
    });
    this.input.keyboard.on('keydown_D', function (event) {
        player.setAccelerationX(800);
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_W', function (event) {
        if (moveKeys['down'].isUp)
            player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp)
            player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_A', function (event) {
        if (moveKeys['right'].isUp)
            player.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp)
            player.setAccelerationX(0);
    });

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = playerBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(player, reticle);
            this.physics.add.collider(enemy, bullet, enemyHitCallback);
            this.physics.add.collider(enemy2, bullet, enemyHitCallback);
            this.physics.add.collider(enemy3, bullet, enemyHitCallback);
            this.physics.add.collider(enemy4, bullet, enemyHitCallback);
            this.physics.add.collider(enemy5, bullet, enemyHitCallback);
            this.physics.add.collider(cantWalk, bullet, hitWall); 
        }
    }, this);

    // Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;
        }
    }, this);

    }

     update (time, delta)
    {
    // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

    // Rotates enemy to face towards player
        enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        enemy2.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        enemy3.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        enemy4.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        enemy5.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);

    //Make reticle move with player
        reticle.body.velocity.x = player.body.velocity.x;
        reticle.body.velocity.y = player.body.velocity.y;

    // Constrain velocity of player
        constrainVelocity(player, 500);

    // Constrain position of constrainReticle
        constrainReticle(reticle);

    // Make enemy fire
       //  enemyFire(enemy, player, time, this);

       if (score == 5){
            this.scene.start('sceneC');
       }

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

        scoreText = this.add.text(100, 300, 'You Infected: '+ score, { fontSize: '64px', fill: '#fff' });

        this.input.once('pointerdown', function () {

            score = 0;
            gameOver = false;
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
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);

function enemyHitCallback(enemyHit, bulletHit)
{
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        enemyHit.health = enemyHit.health - 1;
        console.log("Enemy hp: ", enemyHit.health);

        // Kill enemy if health <= 0
        if (enemyHit.health <= 0)
        {
           //enemyHit.setActive(false).setVisible(false);
           enemyHit.setActive(false);
           enemyHit.setFrame(1);
           score = score + 1;
           scoreText.setText('Infected: ' + score);
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);

    }
}

/*

function playerHitCallback(playerHit, bulletHit)
{
    // Reduce health of player
    if (bulletHit.active === true && playerHit.active === true)
    {
        playerHit.health = playerHit.health - 1;
        console.log("Player hp: ", playerHit.health);

        // Kill hp sprites and kill player if health <= 0
        if (playerHit.health == 2)
        {
            hp3.destroy();
        }
        else if (playerHit.health == 1)
        {
            hp2.destroy();
        }
        else
        {
            hp1.destroy();
            // Game over state should execute here
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}


function enemyFire(enemy, player, time, gameObject)
{
    if (enemy.active === false)
    {
        return;
    }

    if ((time - enemy.lastFired) > 1000)
    {
        enemy.lastFired = time;

        // Get bullet from bullets group
        var bullet = enemyBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(enemy, player);
            // Add collider between bullet and player
            gameObject.physics.add.collider(player, bullet, playerHitCallback);
            gameObject.physics.add.collider(cantWalk, bullet, hitWall2);
        }
    }
}

*/
// Ensures sprite speed doesnt exceed maxVelocity while update is called
function constrainVelocity(sprite, maxVelocity)
{
    if (!sprite || !sprite.body)
      return;

    var angle, currVelocitySqr, vx, vy;
    vx = sprite.body.velocity.x;
    vy = sprite.body.velocity.y;
    currVelocitySqr = vx * vx + vy * vy;

    if (currVelocitySqr > maxVelocity * maxVelocity)
    {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
    }
}

// Ensures reticle does not move offscreen
function constrainReticle(reticle)
{
    var distX = reticle.x-player.x; // X distance between player & reticle
    var distY = reticle.y-player.y; // Y distance between player & reticle

    // Ensures reticle cannot be moved offscreen (player follow)
    if (distX > 800)
        reticle.x = player.x+800;
    else if (distX < -800)
        reticle.x = player.x-800;

    if (distY > 600)
        reticle.y = player.y+600;
    else if (distY < -600)
        reticle.y = player.y-600;
}


function hitWall (cantWalk, bullet)  
{

    cantWalk.setActive(false).setVisible(false);

}

function hitWall2 (cantWalk, bullet) 
{

    cantWalk.setActive(false).setVisible(false);

}

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});
