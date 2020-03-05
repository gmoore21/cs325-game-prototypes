var cows;
var score = 0;
var scoreText;
var scoreText2;
var scoreText3;

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);

    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y);
        }
    }
}

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();

        this.bullets;
        this.chicken;
    }

    preload ()
    {
        this.load.image('bullet', 'assets/Egg.png');
        this.load.image('chicken', 'assets/ChickenGun.png');
        this.load.image('background', 'assets/Background.png'); // preload background
        this.load.image('cow', 'assets/Cow.png');
        this.load.audio('Cow-Moo','assets/Cow-Moo.mp3');  // Add background music 
        this.load.audio('GunSound','assets/GunSound.mp3');    // Add game over sound
}
    }

    create ()
    {
 
        // Add background sound
        CowMoo = this.sound.add('Cow-Moo');
        GunSound = this.sound.add('GunSound');

    // play background music
        backgroundMusic.play();

        this.background = this.add.image(400, 300, 'background'); // add background
        this.bullets = new Bullets(this);
        this.bullets.allowGravity = false;

        scoreText = this.add.text(16, 16, 'Cows Killed: 0', { fontSize: '32px', fill: '#000' });

        this.chicken = this.add.image(400, 500, 'chicken');

        cows = this.physics.add.group({
        key: 'cow',
        repeat: 5,
        setXY: { x: 0, y: 0, stepX: 133 }
        });

        this.input.on('pointermove', (pointer) => {

            this.chicken.x = pointer.x;

        });

        this.input.on('pointerdown', (pointer) => {

            this.bullets.fireBullet(this.chicken.x, this.chicken.y);
            GunSound.play()


        });

        this.physics.add.collider(this.bullets, cows, hitCow, null, this);

    }

}

function hitCow(bullet, cow){

        CowMoo.play();

        cow.disableBody(true,true);
        score = score + 1;
        if(score == 6){
            scoreText2 = this.add.text(150, 250, 'Eat Mor Cow!', { fontSize: '64px', fill: '#fff' });
            scoreText3 = this.add.text(100, 300, 'Reload to Replay', { fontSize: '64px', fill: '#fff' });
        }
        else{
            scoreText.setText('Cows Killed: ' + score);
        }
    }

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 150 }
        }
    },
    scene: Example
};

let game = new Phaser.Game(config);
