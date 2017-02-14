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
        // this.sprite.body.setCircle(50, this.sprite.width / 2 - 50,
        //     this.sprite.height / 2 - 50);
    }
}
