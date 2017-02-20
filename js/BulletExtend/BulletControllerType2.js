class BulletControllerType2 extends BulletController {
    constructor(position, direction, configs) {
        super(
            position,
            "rocket2.png",
            direction,
            Clash.playerBulletGroup,
            {
                bulletSpeed: 1000,
                nameMusic: 'shotrocket',
                radius: 20,
                transparency: false,
                bulletStrength: 10,
                angle: configs.angle
            }
        );
    }
}
