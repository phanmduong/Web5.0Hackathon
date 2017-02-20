class BulletControllerType1 extends BulletController {
    constructor(position, direction) {
        super(
            position,
            "cover-bullet.png",
            direction,
            Clash.playerBulletGroup,
            {
                bulletSpeed: 500,
                nameMusic: 'shotcannon',
                radius: 13,
                transparency: false,
                bulletStrength: Clash.itemNumberHadEaten + 1,
                angle: 0
            }
        );
    }
}
