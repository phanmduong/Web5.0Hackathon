class EnemyController {
    constructor(spriteName, configs) {

        this.distanceMinWithEarth = 400;
            this.randomLocation();
        this.sprite = Clash.enemyGroup.create(
            this.x,
            this.y,
            "assets",
            spriteName
        );

        this.configs = configs;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);

        this.sprite.body.setCircle(this.configs.radius, this.sprite.width / 2 - this.configs.radius,
            this.sprite.height / 2 - this.configs.radius);
        this.sprite.health = this.configs.health;
        this.sprite.score = this.configs.score;
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

    update(){}
}
