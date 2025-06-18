console.log("Connected");

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

function preload() {
    this.load.image("space", "assets/backgroundSpace.png");
    this.load.image("rocket", "assets/LastRocket.png");
}

function create() {
    this.bg = this.add.image(0, 0, "space").setOrigin(0, 0);
    this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

    const centerX = this.sys.game.config.width / 2;

    this.rocket = this.physics.add.sprite(centerX, 650, "rocket").setOrigin(0.5, 0.5);
    this.rocket.setScale(0.08);

    this.rocket.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,S,A,D");
}

function update() {
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
