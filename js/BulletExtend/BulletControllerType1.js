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

    // update(){
    //   Clash.game.physics.arcade.moveToPointer(displayObject, 60, pointer, 0);
    // }
}
