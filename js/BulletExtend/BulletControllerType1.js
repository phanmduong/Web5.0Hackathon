class BulletControllerType1 extends BulletController {
    constructor(position, direction) {
        super(
            position,
            "cover-bullet.png",
            direction,
            Clash.playerBulletGroup, {
                bulletSpeed: 500
            }
        );
    }
}
