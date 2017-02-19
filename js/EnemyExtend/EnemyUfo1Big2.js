class EnemyUfo1Big2 extends EnemyController {
    constructor() {
        super(
            "ufo1-big2.png",
            {
                health: 2,
                enemySpeed: 30,
                radius: 40,
                score: 2,
                isRandom: true
            }
        );
        Clash.game.physics.arcade.moveToObject(this.sprite, Clash.earth.sprite, this.configs.enemySpeed);
        this.sprite.father = this;
    }
    update(){

    }
}
