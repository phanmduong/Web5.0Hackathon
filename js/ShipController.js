class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Clash.game.add.sprite(
            x,
            y,
            "assets",
            spriteName
        );
        this.configs = configs;

        this.timeSinceLastFire = 0;

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        Clash.game.physics.arcade.enableBody(this.sprite);
        this.sprite.body.setCircle(30, this.sprite.width / 2 - 30,
            this.sprite.height / 2 - 30);
    }

    update() {
        this.sprite.rotation = Clash.game.physics.arcade.angleToPointer(this.sprite) + Math.PI / 2;

        if (!this.sprite.alive) return;

        this.timeSinceLastFire += Clash.game.time.physicsElapsed;

        if (Clash.game.input.activePointer.isDown) {
            this.fire();
        }
    }

    fire() {
        if (this.timeSinceLastFire > this.configs.cooldown) {
            this.timeSinceLastFire = 0;
            this.createBullet(new Phaser.Point(0.5, 0.5));
        }
    }

    createBullet(direction) {
        new BulletControllerType1(
            this.sprite.position,
            direction
        );
    }


}
