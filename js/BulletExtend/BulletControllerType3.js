class BulletControllerType3 extends BulletController {
    constructor(position, direction, configs) {
        super(
            position,
            "rocket1.png",
            direction,
            Clash.playerBulletGroup,
            {
                bulletSpeed: 1200,
                nameMusic: 'shotrocket',
                radius: 20,
                transparency: false,
                bulletStrength: 20,
                angle: configs.angle
            }
        );
    }
}
