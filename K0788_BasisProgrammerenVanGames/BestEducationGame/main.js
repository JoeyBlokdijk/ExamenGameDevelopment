console.log("Connected");

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "logos/Logo1.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Klik om te starten",
            {
                fontSize: "50px",
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
        this.health = 100;
        this.maxHealth = 100;
        this.healthBar = null;
    }

    init() {
        this.health = 100;
    }

    preload() {
        this.load.image("space", "assets/space.png");
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        const centerX = this.sys.game.config.width / 2;

        this.rocket = this.physics.add.sprite(centerX, 650, "rocket").setOrigin(0.5, 0.5);
        this.rocket.rotation = Phaser.Math.DegToRad(-45);
        this.rocket.setScale(0.08);
        this.rocket.setSize(1000, 2100);
        this.rocket.setOffset(400, -350);
        this.rocket.setCollideWorldBounds(true);

        this.gasStations = this.physics.add.group();

        this.physics.add.collider(this.rocket, this.gasStations, this.gasStationHit, null, this);
        this.time.addEvent({
            delay: 5000,
            callback: this.spawnGasStation,
            callbackScope: this,
            loop: true
        });

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

        this.healthBarBackground = this.add.graphics();
        this.healthBarBackground.fillStyle(0x555555, 1);
        this.healthBarBackground.fillRect(20, this.scale.height - 40, this.scale.width - 40, 20);

        this.healthBar = this.add.graphics();
        this.updateHealthBar();

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.health -= 5;
                if (this.health < 0) this.health = 0;
                this.updateHealthBar();
                if (this.health <= 0) {
                    this.scene.start("GameOverEmptyFuel");
                }
            },
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
        // if (this.cursors.up.isDown || this.keys.W.isDown) {
        //     this.rocket.setVelocityY(-speed);
        // }
        // if (this.cursors.down.isDown || this.keys.S.isDown) {
        //     this.rocket.setVelocityY(speed);
        // }
    }

    onRocketHit(rocket, meteor) {
        // console.log("Raket is geraakt");

        this.scene.start("GameOverSceneHitMeteor");
    }

    gasStationHit(rocket, gasStation) {
        gasStation.destroy();
        this.resetHealthBar();
    }

    spawnMeteor() {
        let randomX = Phaser.Math.Between(0, this.sys.game.config.width);

        let meteor = this.meteors.create(randomX, -50, "meteor").setOrigin(0.5, 0.5);
        meteor.setScale(0.05);
        meteor.rotation = Phaser.Math.DegToRad(-45);
        meteor.body.setImmovable(true);
        meteor.body.setSize(2500, 2900);
        meteor.body.setOffset(450, 500);
        meteor.body.setVelocityY(150);
    }

    spawnGasStation() {
        let randomX = Phaser.Math.Between(0, this.scale.width);

        let gasStation = this.gasStations.create(randomX, -50, "gasStation").setOrigin(0.5, 0.5);
        gasStation.setScale(0.05);
        gasStation.rotation = Phaser.Math.DegToRad(-45);
        gasStation.body.setSize(2500, 2900);
        gasStation.body.setVelocityY(150);
    }

    resetHealthBar() {
        console.log("tank wordt bijgevuld");
        this.health = 105;
        this.updateHealthBar;
    }

    updateHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0xff0000, 1);
        let barWidth = (this.scale.width - 40) * (this.health / this.maxHealth);
        this.healthBar.fillRect(20, this.scale.height - 40, barWidth, 20);
    }
}

class GameOverSceneHitMeteor extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverSceneHitMeteor" });
    }

    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "logos/Logo1.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Game Over",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 1);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Je hebt een astroïde geraakt!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 0);

        this.button = this.add.text(this.scale.width / 2, 500, "Opnieuw proberen", {
            fontSize: "32px",
            color: "#000000",
            backgroundColor: "#07fa34",
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive();

        this.button.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}

class GameOverEmptyFuel extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverEmptyFuel" });
    }

    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "logos/Logo1.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Game Over",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 1);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "De benzine van de raket was op!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 0);

        this.button = this.add.text(this.scale.width / 2, 500, "Opnieuw proberen", {
            fontSize: "32px",
            color: "#000000",
            backgroundColor: "#07fa34",
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive();

        this.button.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
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
    scene: [StartScene, GameScene, GameOverSceneHitMeteor, GameOverEmptyFuel]
};


const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
