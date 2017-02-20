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

        this.sprite.inputEnabled = true;
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

        if (Clash.countEnemyKill >= Clash.configs.maxEnemyToShield * Clash.countShielded) {
            Clash.countEnemyKill = Clash.configs.maxEnemyToShield * Clash.countShielded;
            Clash.isClickSheild = false;
            Clash.display.clickHere.visible = true;
            Clash.earth.sprite.events.onInputDown.add(this.clickEarth, this);

        }

        Clash.display.earthXP.scale.setTo(Clash.countEnemyKill / Clash.countShielded * 1.5 / Clash.configs.maxEnemyToShield, 1.5);
    }

    clickEarth() {
        if (!Clash.isClickSheild) {
            Clash.display.progressSheild.visible = true;
            Clash.display.iconSheild.visible = true;
            Clash.display.clickHere.visible =false;
            Clash.timeSinceLastSheild = 0;
            Clash.isSheild = true;
            Clash.isClickSheild = true;
            Clash.countEnemyKill = 0;

            if (Clash.countShielded < 128)
                Clash.countShielded *= 2;

            if (Clash.enemiesKilled > Clash.configs.scoreLevelGame2 && Clash.countShielded < 500){
                Clash.countShielded *= 1.2;
            }


            Clash.sheild.reset();
        }
    }

}

