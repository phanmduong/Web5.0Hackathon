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

        this.configs = configs;
        this.sprite.health = this.configs.health;

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        Clash.game.physics.arcade.enableBody(this.sprite);

        this.sprite.body.allowGravity = 0;
        this.sprite.body.immovable = true;

        this.sprite.body.setCircle(100, this.sprite.width / 2 - 100,
            this.sprite.height / 2 - 100);
    }

    update() {
        if (this.sprite.health <= 0) {
            this.sprite.health = 0;
            Clash.killAllObject();
            Clash.playgame.reset(Clash.game.height / 2, 800);
            Clash.isPlaygame = false;
            Clash.stateText.text = "Game over";
            Clash.stateText.visible = true;
        }
        Clash.display.earthHP.scale.setTo(this.sprite.health * 1.5 / this.configs.health, 1.5);
        // console.log(this.sprite.health);
    }
}
