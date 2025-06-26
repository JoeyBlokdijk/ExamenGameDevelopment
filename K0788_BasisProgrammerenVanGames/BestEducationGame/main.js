console.log("Connected");

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    // LOADS ALL IMAGES THAT I'M USING
    preload() {
        this.load.image("space", "assets/backgroundSpace.png");
        this.load.image("rocket", "logos/Logo2.png");
        this.load.image("meteor", "assets/astroïde.png");
        this.load.image("gasStation", "assets/Gas-station.png");
        this.load.image("finishLine", "assets/FinishLine.png");
        this.load.image("fire", "assets/raketVuur.png");
        this.load.image("bestLogo", "logos/Logo1.png");
        // icons
        this.load.image("A-icon", "Icons/letter-a.png");
        this.load.image("ArrowLeft", "Icons/arrow_left.png");
        this.load.image("D-icon", "Icons/letter-d.png");
        this.load.image("ArrowRight", "Icons/arrow_right.png");
        this.load.image("W-icon", "Icons/letter-w.png");
        this.load.image("ArrowUp", "Icons/arrow_up.png");
    }

    create() {
        // CREATES BACKGROUND OF START SCREEN
        this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
        this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // CREATING THE CONTAINER FOR INSTRUCTIONS
        let container = this.add.container(1400, 150);

        let border = this.add.graphics();
        border.lineStyle(3, 0x000c8c, 1);
        border.strokeRect(-100, -50, 300, 250);

        container.add(border);

        // ADDING TEXT AND ICONS IN CONTAINER FOR EXPLANATION OF THE GAME
        let text = this.add.text(50, 0, "Spel uitleg:", {
            fontSize: "20px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        text.setOrigin(0.5);
        container.add(text);

        let iconA = this.add.image(-80, 35, "A-icon").setScale(0.04);
        let slashText = this.add.text(-72, 25, "/").setScale(1.5);
        let ArrowLeft = this.add.image(-50, 35, "ArrowLeft").setScale(0.04);
        let context = this.add.text(-30, 30, " = Links bewegen", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(iconA);
        container.add(slashText);
        container.add(ArrowLeft);
        container.add(context);
        let iconD = this.add.image(-80, 65, "D-icon").setScale(0.04);
        let slashText2 = this.add.text(-73, 55, "/").setScale(1.5);
        let ArrowRight = this.add.image(-50, 65, "ArrowRight").setScale(0.04);
        let context2 = this.add.text(-30, 55, "= Rechts bewegen", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(iconD);
        container.add(slashText2);
        container.add(ArrowRight);
        container.add(context2);
        let iconW = this.add.image(-80, 90, "W-icon").setScale(0.04);
        let slashText3 = this.add.text(-73, 80, "/").setScale(1.5);
        let ArrowUp = this.add.image(-50, 90, "ArrowUp").setScale(0.04);
        let context3 = this.add.text(-30, 80, " = Sneller", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(iconW);
        container.add(slashText3);
        container.add(ArrowUp);
        container.add(context3);
        let context4 = this.add.text(-90, 110, "- Bijtanken bij tankstation", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context4);
        let context5 = this.add.text(-90, 140, "- Tank leeg = Game Over", {
            fontSize: "15px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        container.add(context5);
        let context6 = this.add.text(-90, 170, "- Raken astroïede = Game Over", {
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

        // ADDING ROCKET AS A PHYSIC SO IT CAN BUMP INTO THINGS
        this.rocket = this.physics.add.sprite(centerX, 600, "rocket").setOrigin(0.5, 0.5);
        this.rocket.rotation = Phaser.Math.DegToRad(-43);
        this.rocket.setScale(0.08);
        this.rocket.setSize(1000, 2100);
        this.rocket.setOffset(400, -350);
        this.rocket.setCollideWorldBounds(true);

        // CREATING THE FIRE BENEATH THE ROKET
        this.fire = this.add.image(this.rocket.x, this.rocket.y + 100, "fire");
        this.fire.setScale(0.05);
        this.fire.setFlipY(true);
        this.fire.setVisible(false);

        // CREATING GROUPS FOR GASSTATION
        this.gasStations = this.physics.add.group();

        // SEES IF THE ROCKET HAS HIT A GASSTATION
        this.physics.add.collider(this.rocket, this.gasStations, this.gasStationHit, null, this);
        // TIMER FOR THE SPAWNING OF THE GASSTATION
        this.gasStaionTimer = this.time.addEvent({
            delay: 5000,
            callback: this.spawnGasStation,
            callbackScope: this,
            loop: true
        });

        // CREATING BUTTON FOR THE GAME TO SEE
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys("W,S,A,D");

        // CREATING A GROUP FOR METEORS
        this.meteors = this.physics.add.group();

        // SEES IF THE ROCKET HAS HIT A METEOR
        this.physics.add.collider(this.rocket, this.meteors, this.onRocketHit, null, this);
        // TIMER FOR THE SPAWNING OF THE METEORS
        this.meteorTimer = this.time.addEvent({
            delay: 2000,
            callback: this.spawnMeteor,
            callbackScope: this,
            loop: true
        });

        // CREATS THE FUEL TANK AND MAKE IT GO DOWN
        this.healthBarBackground = this.add.graphics();
        this.healthBarBackground.fillStyle(0x555555, 1);
        this.healthBarBackground.fillRect(20, this.scale.height - 40, this.scale.width - 40, 20);

        this.healthBar = this.add.graphics();
        this.updateHealthBar();

        this.healthEvent = this.time.addEvent({
            delay: 100,
            callback: () => {
                this.health -= 0.5;
                if (this.health < 0) this.health = 0;
                this.updateHealthBar();
                // IF THE FUEL IS EMPTY, YOU WILL BE SEND TO THE GAME OVER SCREEN
                if (this.health <= 0) {
                    this.scene.start("GameOverEmptyFuel");
                }
            },
            loop: true
        });

        // SETS TIMER FOR WHEN THE FINISH LINES IS SHOWED
        this.time.delayedCall(60000, () => {
            this.showFinishLine();
        });

    }

    update() {
        const speed = 600;

        this.rocket.setVelocity(0);

        // FIRST TWO IFS SEES WICH BUTTON IS DOWN AND DOES THAT ACTION
        if (this.cursors.left.isDown || this.keys.A.isDown) {
            this.rocket.setVelocityX(-speed);
        }
        if (this.cursors.right.isDown || this.keys.D.isDown) {
            this.rocket.setVelocityX(speed);
        }
        // WHEN W OR ARROW UP IS PUSHED THE SPEED INCREASES, THE SPAWNRATE AND FLAMES OUT OF THE ROCKET
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
            // LOWERS THE HEALTH FASTER
            if (this.healthEvent.delay !== 50) {
                this.healthEvent.remove(false);
                this.healthEvent = this.time.addEvent({
                    delay: 50,
                    callback: () => {
                        this.health -= 0.5;
                        if (this.health < 0) this.health = 0;
                        this.updateHealthBar();
                        // IF THE FUEL IS EMPTY, YOU WILL BE SEND TO THE GAME OVER SCREEN
                        if (this.health <= 0) {
                            this.scene.start("GameOverEmptyFuel");
                        }
                    },
                    loop: true
                });
            }
        } else {
            // SETS EVERYTHING TO NORMAL
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
            // SETS HEALTH LOWERING TO NORMAL
            if (this.healthEvent.delay !== 100) {
                this.healthEvent.remove(false);
                this.healthEvent = this.time.addEvent({
                    delay: 100,
                    callback: () => {
                        this.health -= 0.5;
                        if (this.health < 0) this.health = 0;
                        this.updateHealthBar();
                        // IF THE FUEL IS EMPTY, YOU WILL BE SEND TO THE GAME OVER SCREEN
                        if (this.health <= 0) {
                            this.scene.start("GameOverEmptyFuel");
                        }
                    },
                    loop: true
                });
            }
        }
        // CORRECTS THE SPEED OF THE FALLING OBJECTS BASED ON SPEEDMULTIPLIER (1/2)
        this.meteors.getChildren().forEach(meteor => {
            meteor.body.setVelocityY(150 * speedMultiplier);
        });
        this.gasStations.getChildren().forEach(gasStation => {
            gasStation.body.setVelocityY(150 * speedMultiplier);
        });

        // ROTATES THE METEOR
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

    // SPAWNS METEOR ON RANDOM X-POSITION ON TOP OF THE SCREEN
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

    // SPAWNS GASSTATION ON RANDOM X-POSITION ON TOP OF THE SCREEN
    spawnGasStation() {
        let randomX = Phaser.Math.Between(0, this.scale.width);

        let gasStation = this.gasStations.create(randomX, -50, "gasStation").setOrigin(0.5, 0.5);
        gasStation.setScale(0.05);
        gasStation.rotation = Phaser.Math.DegToRad(-45);
        gasStation.body.setSize(1000, 1000);
        gasStation.body.setVelocityY(150);
    }

    // RESETS THE HEALTHBAR
    resetHealthBar() {
        this.health = 105;
        this.updateHealthBar();
    }

    updateHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0xff0000, 1);
        let barWidth = (this.scale.width - 40) * (this.health / this.maxHealth);
        this.healthBar.fillRect(20, this.scale.height - 40, barWidth, 20);
    }

    // SHOWS FINISHLINE ON FULL WIDTH OF THE SCREEN
    showFinishLine() {
        let finishLineWidth = this.textures.get("finishLine").getSourceImage().width * 0.05;
        let screenWidth = this.sys.game.config.width;

        for (let x = 0; x < screenWidth; x += finishLineWidth) {
            let finishLine = this.physics.add.image(x, -50, "finishLine").setScale(0.05);
            finishLine.body.setVelocityY(150);
            finishLine.setSize(5000, 1500);

            // ADD A COLLIDER SO WHEN THE FINISH IS HIT, THE FINISHSCENE SHOWS
            this.physics.add.collider(this.rocket, finishLine, this.gameCompleted, null, this);
        }
    }

    gameCompleted() {
        this.scene.start("FinishedScene");
    }
}

// SCENE WHEN THE ROCKET HITS A METEOR
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

        this.add.text(
            this.sys.game.config.width / 2,
            600,
            "Klik om nog een keer te spelen!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 4);

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

        this.input.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}

// SCENE WHEN THE FUEL IS EMPTY
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

        this.add.text(
            this.sys.game.config.width / 2,
            600,
            "Klik om nog een keer te spelen!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 4);

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

        this.input.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}

// SCENE WHEN THE ROCKET REACHES THE FINISH
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

        this.add.text(
            this.sys.game.config.width / 2,
            600,
            "Klik om nog een keer te spelen!",
            {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5, 4);

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

        this.input.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}

// WIDTH/HEIGHT, PHYSICS ENGINE AND SCENES THAT ARE USED
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

// ENSURES THAT THE FULL WIDTH IS ALWAYS USED
window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});