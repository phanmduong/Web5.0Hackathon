class EnemyUfo1Small1 extends EnemyController {
    constructor() {
        super(
            "ufo1-small1.png",
            {
                health: 1,
                enemySpeed: 50,
                radius: 25,
                score: 1,
                isRandom: true
            }
        );
        Clash.game.physics.arcade.moveToObject(this.sprite, Clash.earth.sprite, this.configs.enemySpeed);
        this.sprite.father = this;
    }

    update(){}
}
