class BulletControllerType2 extends BulletController {
    constructor(position, direction) {
        super(
            position,
            "clock1.png",
            direction,
            Clash.playerBulletGroup,
            'shotcannon',
            {
                bulletSpeed: 800
            }
        );
    }
}
