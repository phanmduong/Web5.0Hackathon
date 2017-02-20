class BulletController {
    constructor(position, spriteName, direction, physicsGroup, config) {
        this.sprite = physicsGroup.create(
            position.x,
            position.y,
            "assets",
            spriteName
        );

        this.configs = config;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);

        this.sprite.health = this.configs.bulletStrength;
        this.sprite.bulletStrength = this.configs.bulletStrength;

        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.transparency = this.configs.transparency;

        this.sprite.rotation = Clash.game.physics.arcade.angleToPointer(this.sprite) + Math.PI / 2;
        Clash.game.physics.arcade.moveToXY(this.sprite,
           (Clash.game.input.activePointer.x- Clash.player.sprite.body.position.x) * Math.cos(config.angle) - (Clash.game.input.activePointer.y - Clash.player.sprite.body.position.y) * Math.sin(config.angle) + Clash.player.sprite.body.position.x,
            (Clash.game.input.activePointer.x - Clash.player.sprite.body.position.x) * Math.sin(config.angle) + (Clash.game.input.activePointer.y - Clash.player.sprite.body.position.y) * Math.cos(config.angle) + Clash.player.sprite.body.position.y,
            config.bulletSpeed);


        this.sprite.music = Clash.game.add.audio(config.nameMusic);
        this.sprite.music.play();

        this.sprite.body.setCircle(this.configs.radius, this.sprite.width / 2 - this.configs.radius,
            this.sprite.height / 2 - this.configs.radius);
        this.sprite.scale.setTo(1.5, 1.5);


    }

}
