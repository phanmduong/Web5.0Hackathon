class BulletControllerType2 extends BulletController {
    constructor(position, direction) {
        super(
            position,
            "clock1.png",
            direction,
            Clash.playerBulletGroup,
            {
                bulletSpeed: 800,
                imageWeapon: 'cannon2.jpg',
                nameMusic: 'shotcannon'
            }
        );
    }
}
