class EnemyFast {
    constructor(x, y, spriteName, configs) {
        this.sprite = Clash.enemyGroup.create(
            x,
            y,
            "assets",
            spriteName
        );
        this.configs = configs;
        this.sprite.health = this.configs.health;
        this.sprite.score = this.configs.score;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.setCircle(this.configs.radius, this.sprite.width / 2 - this.configs.radius,
            this.sprite.height / 2 - this.configs.radius);
        this.sprite.scale.setTo(1.5, 1.5);
        Clash.game.physics.arcade.moveToXY(this.sprite, 600, y, 300)
        this.sprite.father = this;

    }

    update() {

    }
}
