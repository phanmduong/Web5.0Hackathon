/**
 * Created by Phan M Duong on 2/13/2017.
 */
class Earth {
    constructor(x, y, spriteName, configs) {
        this.sprite = Clash.game.add.sprite(
            x,
            y,
            "assets",
            spriteName
        );

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        Clash.game.physics.arcade.enableBody(this.sprite);
        this.sprite.body.setCircle(100, this.sprite.width / 2 - 100,
            this.sprite.height / 2 - 100);
    }
}
