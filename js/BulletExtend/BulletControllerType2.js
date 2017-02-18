class BulletControllerType2 extends BulletController {
    constructor(position, direction) {
        super(
            position,
            "rocket2.png",
            direction,
            Clash.playerBulletGroup,
            {
                bulletSpeed: 200,
                imageWeapon: 'cannon2.jpg',
                nameMusic: 'shotcannon',
                radius: 20,
            }
        );
    }
}
