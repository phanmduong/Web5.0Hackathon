class EnemyMeteorite extends EnemyController {
    constructor(configs) {
        super(
            "frame0001.png",
            {
                health: 8,
                radius: 38,
                score: 1,
                isRandom: false,
                moveRadius: configs.moveRadius
            }
        );
        this.period = 0;
        this.sprite.father = this;
    }

    update() {

        this.period += Clash.game.time.physicsElapsed;
        var radius = this.configs.moveRadius;
        this.sprite.position.x = Clash.earth.sprite.position.x + Math.cos(this.period) * radius;
        this.sprite.position.y = Clash.earth.sprite.position.y + Math.sin(this.period) * radius;
    }
}