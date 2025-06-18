console.log("Connected");

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "assets/LastRocket.png");
        this.load.image("meteor", "assets/meteor.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Klik om te starten",
            {
                fontSize: "32px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 0.5);

        this.input.once("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        this.load.image("space", "assets/space.png");
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("meteor", "assets/meteor.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        const centerX = this.sys.game.config.width / 2;

        this.rocket = this.physics.add.sprite(centerX, 650, "rocket").setOrigin(0.5, 0.5);
        this.rocket.setScale(0.08);
        this.rocket.setSize(850, 1700);
        this.rocket.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys("W,S,A,D");

        this.meteors = this.physics.add.group();

        this.physics.add.collider(this.rocket, this.meteors, this.onRocketHit, null, this);
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnMeteor,
            callbackScope: this,
            loop: true
        });

    }

    update() {
        const speed = 600;

        this.rocket.setVelocity(0);

        if (this.cursors.left.isDown || this.keys.A.isDown) {
            this.rocket.setVelocityX(-speed);
        }
        if (this.cursors.right.isDown || this.keys.D.isDown) {
            this.rocket.setVelocityX(speed);
        }
        if (this.cursors.up.isDown || this.keys.W.isDown) {
            this.rocket.setVelocityY(-speed);
        }
        if (this.cursors.down.isDown || this.keys.S.isDown) {
            this.rocket.setVelocityY(speed);
        }
    }

    onRocketHit(rocket, meteor) {

    }

    spawnMeteor() {
        let randomX = Phaser.Math.Between(0, this.sys.game.config.width);

        let meteor = this.meteors.create(randomX, -50, "meteor").setOrigin(0.5, 0.5);
        meteor.setScale(0.1);
        meteor.rotation = Phaser.Math.DegToRad(-45);
        meteor.body.setImmovable(true);
        meteor.body.setSize(1000, 2600);
        meteor.body.setVelocityY(150);
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [StartScene, GameScene]
};


const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
