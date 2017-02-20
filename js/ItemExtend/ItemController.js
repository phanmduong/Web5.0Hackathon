class ItemController {
    constructor(spriteName, configs) {
        this.distanceMinWithEarth = 400;
        this.randomLocation();
        this.sprite = Clash.itemGroup.create(
            this.x,
            this.y,
            "assets",
            spriteName
        );
        this.configs = configs;
        this.sprite.type = this.configs.type;
        this.configs = configs;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.health = this.configs.health;
        Clash.game.physics.arcade.moveToObject(this.sprite, Clash.earth.sprite, this.configs.enemySpeed);
        this.sprite.scale.setTo(1.5, 1.5);
    }

    randomLocation() {

        do {
            this.x = Clash.game.world.randomX;
            this.y = Clash.game.world.randomY;

            if (Math.sqrt((this.x - Clash.game.height / 2) * (this.x - Clash.game.height / 2) +
                    (this.y - Clash.game.width / 2) * (this.y - Clash.game.width / 2)) >= this.distanceMinWithEarth) break;
        } while (true);
    }
}
