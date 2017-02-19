/**
 * Created by Phan M Duong on 2/18/2017.
 */
class Mirror {
    constructor(x, y, spriteName, configs) {
        this.sprite = Clash.game.add.sprite(
            x,
            y,
            "assets",
            spriteName
        );


        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        Clash.game.physics.arcade.enableBody(this.sprite);

        // this.sprite.body.setCircle(radius, this.sprite.width / 2 - radius,
        //     this.sprite.height / 2 - 100);
    }
    update(){

    }
}
