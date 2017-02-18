class BulletControllerType1 extends BulletController {
    constructor(position, direction) {
        super(
            position,
            "cover-bullet.png",
            direction,
            Clash.playerBulletGroup,
            {
                bulletSpeed: 200,
                imageWeapon: 'cannon1.jpg',
                nameMusic: 'shotcannon',
                radius: 13,
            }
        );
    }
}
