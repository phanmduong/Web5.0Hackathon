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

        this.sprite.health = this.configs.health;

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);

        Clash.game.physics.arcade.enableBody(this.sprite);
        console.log(this.sprite.width);
        // this.sprite.scale.setTo(1.5, 1.5);
        console.log(this.sprite.width);
        this.sprite.body.setCircle(this.configs.radius, this.sprite.width / 2 - this.configs.radius,
            this.sprite.height / 2 - this.configs.radius);
    }

    update() {
        Clash.display.shipHP.scale.setTo(this.sprite.health * 1.5 / this.configs.health, 1.5);
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
