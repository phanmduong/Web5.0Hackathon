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
    
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.transparency = this.configs.transparency;

        this.sprite.rotation = Clash.game.physics.arcade.angleToPointer(this.sprite) + Math.PI / 2;

        Clash.game.physics.arcade.moveToPointer(this.sprite, config.bulletSpeed);
        Clash.display.weapon.frameName = config.imageWeapon;

        this.sprite.music = Clash.game.add.audio(config.nameMusic);
        this.sprite.music.play();

        this.sprite.body.setCircle(this.configs.radius, this.sprite.width / 2 - this.configs.radius,
            this.sprite.height / 2 - this.configs.radius );
        this.sprite.scale.setTo(1.5, 1.5);


    }

}
