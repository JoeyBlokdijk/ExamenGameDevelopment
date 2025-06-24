console.log("Connected");

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "logos/Logo2.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
        this.load.image("finishLine", "assets/FinishLine.png");
        this.load.image("fire", "assets/raketVuur.png");
        this.load.image("bestLogo", "logos/Logo1.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        let container = this.add.container(1400, 150);

        let border = this.add.graphics();
        border.lineStyle(3, 0x000c8c, 1);
        border.strokeRect(-100, -50, 300, 250);

        container.add(border);

        let text = this.add.text(50, 0, "Spel uitleg:", {
            fontSize: "20px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        text.setOrigin(0.5);
        container.add(text);

        let context = this.add.text(-90, 30, "- A / < = Links bewegen", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context);
        let context2 = this.add.text(-90, 50, "- D / > = Rechts bewegen", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context2);
        let context3 = this.add.text(-90, 70, "- W / pijl omhoog = Sneller", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context3);
        let context4 = this.add.text(-90, 90, "- Bijtanken bij tankstation", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context4);
        let context5 = this.add.text(-90, 110, "- Tank leeg = Game Over", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context5);
        let context6 = this.add.text(-90, 130, "- Raken astroïede = Game Over", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context6);

        this.bestLogo = this.add.image(0, 0, "bestLogo").setOrigin(0.5, 0.5);
        this.bestLogo.setScale(0.1);
        this.bestLogo.x = this.cameras.main.width / 2;
        this.bestLogo.y = this.cameras.main.height / 2 - 150;

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Best Education",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 1);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Wij lanceren je de toekomst in!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 0);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Klik om de game te starten!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, -2);

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
        this.load.image("finishLine", "assets/FinishLine.png");
        this.load.image("fire", "assets/raketVuur.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        const centerX = this.sys.game.config.width / 2;

        this.rocket = this.physics.add.sprite(centerX, 650, "rocket").setOrigin(0.5, 0.5);
        this.rocket.rotation = Phaser.Math.DegToRad(-43);
        this.rocket.setScale(0.08);
        this.rocket.setSize(1000, 2100);
        this.rocket.setOffset(400, -350);
        this.rocket.setCollideWorldBounds(true);

        this.fire = this.add.image(this.rocket.x, this.rocket.y + 100, "fire");
        this.fire.setScale(0.05);
        this.fire.setFlipY(true);
        this.fire.setVisible(false);

        this.gasStations = this.physics.add.group();

        this.physics.add.collider(this.rocket, this.gasStations, this.gasStationHit, null, this);
        this.gasStaionTimer = this.time.addEvent({
            delay: 5000,
            callback: this.spawnGasStation,
            callbackScope: this,
            loop: true
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys("W,S,A,D");

        this.meteors = this.physics.add.group();


        this.physics.add.collider(this.rocket, this.meteors, this.onRocketHit, null, this);
        this.meteorTimer = this.time.addEvent({
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


        // MAKES THE FUEL GO DOWN AND SEES WHEN THE FUEL IS EMPTY
        this.healthEvent = this.time.addEvent({
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

        this.time.delayedCall(60000, () => {
            this.showFinishLine();
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
        let speedMultiplier = 1;
        if (this.cursors.up.isDown || this.keys.W.isDown) {
            this.fire.setVisible(true);
            this.fire.x = this.rocket.x;
            this.fire.y = this.rocket.y + 110;
            speedMultiplier = 2;
            if (this.meteorTimer.delay !== 1000) {
                this.meteorTimer.remove(false);
                this.meteorTimer = this.time.addEvent({
                    delay: 1000,
                    callback: this.spawnMeteor,
                    callbackScope: this,
                    loop: true
                });
            }
            if (this.gasStaionTimer.delay !== 3000) {
                this.gasStaionTimer.remove(false);
                this.gasStaionTimer = this.time.addEvent({
                    delay: 3000,
                    callback: this.spawnGasStation,
                    callbackScope: this,
                    loop: true
                });
            }
            if (this.healthEvent.delay !== 500) {
                this.healthEvent.remove(false);
                this.healthEvent = this.time.addEvent({
                    delay: 500,
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
        } else {
            this.fire.setVisible(false);
            if (this.meteorTimer.delay !== 2000) {
                this.meteorTimer.remove(false);
                this.meteorTimer = this.time.addEvent({
                    delay: 2000,
                    callback: this.spawnMeteor,
                    callbackScope: this,
                    loop: true
                });
            }
            if (this.gasStaionTimer.delay !== 5000) {
                this.gasStaionTimer.remove(false);
                this.gasStaionTimer = this.time.addEvent({
                    delay: 5000,
                    callback: this.spawnGasStation,
                    callbackScope: this,
                    loop: true
                });
            }
            if (this.healthEvent.delay !== 1000) {
                this.healthEvent.remove(false);
                this.healthEvent = this.time.addEvent({
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
        }
        this.meteors.getChildren().forEach(meteor => {
            meteor.body.setVelocityY(150 * speedMultiplier);
        });
        this.gasStations.getChildren().forEach(gasStation => {
            gasStation.body.setVelocityY(150 * speedMultiplier);
        });
        // if (this.cursors.down.isDown || this.keys.S.isDown) {
        //     this.rocket.setVelocityY(speed);
        // }

        this.meteors.children.iterate((meteor) => {
            if (meteor) {
                meteor.rotation += 0.02;
            }
        });
    }

    onRocketHit(rocket, meteor) {
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
        meteor.body.setOffset(700, 700);
        meteor.body.setVelocityY(150);
    }

    spawnGasStation() {
        let randomX = Phaser.Math.Between(0, this.scale.width);

        let gasStation = this.gasStations.create(randomX, -50, "gasStation").setOrigin(0.5, 0.5);
        gasStation.setScale(0.05);
        gasStation.rotation = Phaser.Math.DegToRad(-45);
        gasStation.body.setSize(1000, 1000);
        gasStation.body.setVelocityY(150);
    }

    resetHealthBar() {
        this.health = 105;
        this.updateHealthBar;
    }

    updateHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0xff0000, 1);
        let barWidth = (this.scale.width - 40) * (this.health / this.maxHealth);
        this.healthBar.fillRect(20, this.scale.height - 40, barWidth, 20);
    }

    showFinishLine() {
        let finishLineWidth = this.textures.get("finishLine").getSourceImage().width * 0.05;
        let screenWidth = this.sys.game.config.width;

        for (let x = 0; x < screenWidth; x += finishLineWidth) {
            let finishLine = this.physics.add.image(x, -50, "finishLine").setScale(0.05);
            finishLine.body.setVelocityY(150);
            finishLine.setSize(5000, 1500);

            this.physics.add.collider(this.rocket, finishLine, this.gameCompleted, null, this);
        }
    }

    gameCompleted() {
        this.scene.start("FinishedScene");
    }
}

class GameOverSceneHitMeteor extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverSceneHitMeteor" });
    }

    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "logos/Logo2.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
        this.load.image("finishLine", "assets/FinishLine.png");
        this.load.image("fire", "assets/raketVuur.png");
        this.load.image("bestLogo", "logos/Logo3.png");
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
        ).setOrigin(0.5, 4);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Je hebt een astroïde geraakt!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 3);

        this.button = this.add.text(this.scale.width / 2, 500, "Opnieuw proberen", {
            fontSize: "32px",
            color: "#000000",
            backgroundColor: "#07fa34",
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 4).setInteractive();

        this.bestLogo = this.add.image(0, 0, "bestLogo").setOrigin(0.5, 0.5);
        this.bestLogo.setScale(0.1);
        this.bestLogo.x = this.cameras.main.width / 2;
        this.bestLogo.y = this.cameras.main.height / 2 + 200;

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Wij lanceren je de toekomst in!",
            {
                fontSize: "25px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, -11);

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
        this.load.image("rocket", "logos/Logo2.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
        this.load.image("finishLine", "assets/FinishLine.png");
        this.load.image("fire", "assets/raketVuur.png");
        this.load.image("bestLogo", "logos/Logo1.png");
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
        ).setOrigin(0.5, 4);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "De benzine van de raket was op!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 3);

        this.button = this.add.text(this.scale.width / 2, 500, "Opnieuw proberen", {
            fontSize: "32px",
            color: "#000000",
            backgroundColor: "#07fa34",
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 4).setInteractive();

        this.bestLogo = this.add.image(0, 0, "bestLogo").setOrigin(0.5, 0.5);
        this.bestLogo.setScale(0.1);
        this.bestLogo.x = this.cameras.main.width / 2;
        this.bestLogo.y = this.cameras.main.height / 2 + 200;

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Wij lanceren je de toekomst in!",
            {
                fontSize: "25px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, -11);

        this.button.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}

class FinishedScene extends Phaser.Scene {
    constructor() {
        super({ key: "FinishedScene" });
    }

    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "logos/Logo2.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
        this.load.image("finishLine", "assets/FinishLine.png");
        this.load.image("fire", "assets/raketVuur.png");
        this.load.image("bestLogo", "logos/logo2.png");
    }

    create() {
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.logo = this.add.image(0, 0, "bestLogo").setOrigin(1, 1);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Gefeliciteerd",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 4);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Je hebt het gehaald!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 3);

        this.button = this.add.text(this.scale.width / 2, 500, "Nog een keer spelen", {
            fontSize: "32px",
            color: "#000000",
            backgroundColor: "#07fa34",
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 4).setInteractive();

        this.bestLogo = this.add.image(0, 0, "bestLogo").setOrigin(0.5, 0.5);
        this.bestLogo.setScale(0.1);
        this.bestLogo.x = this.cameras.main.width / 2;
        this.bestLogo.y = this.cameras.main.height / 2 + 200;

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Wij lanceren je de toekomst in!",
            {
                fontSize: "25px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, -11);

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
    scene: [StartScene, GameScene, GameOverSceneHitMeteor, GameOverEmptyFuel, FinishedScene]
};


const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
