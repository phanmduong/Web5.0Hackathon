/**
 * Created by Ng T Duong on 2/14/2017.
 */
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
        this.sprite.health = this.configs.health;
        Clash.game.physics.arcade.moveToObject(this.sprite, Clash.earth.sprite, this.configs.enemySpeed);
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
