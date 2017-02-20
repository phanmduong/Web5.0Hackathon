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

        this.configs = configs;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        Clash.game.physics.arcade.enableBody(this.sprite);
        this.sprite.scale.setTo(2, 2);

        this.sprite.body.setCircle(configs.radius, this.sprite.width / 2 - configs.radius,
            this.sprite.height / 2 - configs.radius);
        // this.sprite.scale.setTo(2, 2);
    }

    reset(){
        this.sprite.reset(this.sprite.position.x, this.sprite.position.x);
    }
    update(){

    }
}
