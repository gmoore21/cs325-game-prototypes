var stars;
var score = 0;
var scoreText;

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
        this.ship;
    }

    preload ()
    {
        this.load.image('bullet', 'assets/bomb.png');
        this.load.image('ship', 'assets/ChickenGun.png');
        this.load.image('background', 'assets/Background.png'); // preload background
        this.load.image('star', 'assets/Cow.png');
    }

    create ()
    {

        scoreText = this.add.text(16, 16, 'Cows Killed: 0', { fontSize: '32px', fill: '#000' });

        this.background = this.add.image(400, 300, 'background'); // add background
        this.bullets = new Bullets(this);
        this.bullets.allowGravity = false;

        this.ship = this.add.image(400, 500, 'ship');

        stars = this.physics.add.group({
        key: 'star',
        repeat: 5,
        setXY: { x: 0, y: 0, stepX: 133 }
        });


        this.input.on('pointermove', (pointer) => {

            this.ship.x = pointer.x;

        });

        this.input.on('pointerdown', (pointer) => {

            this.bullets.fireBullet(this.ship.x, this.ship.y);

        });

        this.physics.add.collider(this.bullets, stars, hitStar, null, this);

        //this.physics.add.collider(player, bombs, hitPlayer, null, this);


    }

    update(){
    }


}

function hitStar(bullet, star){

        star.disableBody(true,true);
        score += 1;
        scoreText.setText('Cows Killed: ' + score);

        if(score == 5){

            scoreText = this.add.text(150, 250, 'Eat Mor Cow!', { fontSize: '64px', fill: '#fff' });
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
            gravity: { y: 50 }
        }
    },
    scene: Example
};

let game = new Phaser.Game(config);
