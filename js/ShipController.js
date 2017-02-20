class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Clash.game.add.sprite(
            x,
            y,
            "assets",
            spriteName
        );

        this.x = x;
        this.y = y;

        this.configs = configs;

        this.timeSinceLastFire = 0;

        this.sprite.health = this.configs.health;
        this.sprite.bulletType = 1;

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.numberBullet = 1;
        this.timeSinceLastRevival = 0;
        this.timeSinceBlastware = 0;
        this.timeSinceLastBulletPowerup = 0;
        this.timeSinceLastBulletPowerup2 = 0;
        this.isBlastware = false;


        Clash.game.physics.arcade.enableBody(this.sprite);
        this.sprite.body.setCircle(this.configs.radius, this.sprite.width / 2 - this.configs.radius,
            this.sprite.height / 2 - this.configs.radius);
        this.sprite.scale.setTo(1.5, 1.5);
    }

    update() {
        if (Clash.enemiesKilled < Clash.configs.scoreLevelGame2) {
            if (Clash.itemNumberHadEaten < Clash.configs.maxItemPowerup) {
                this.timeSinceLastBulletPowerup += Clash.game.time.physicsElapsed;
                Clash.display.progressPowerup.scale.setTo((Clash.configs.timeBulletPowerup - this.timeSinceLastBulletPowerup ) * 1.5 / Clash.configs.timeBulletPowerup, 1.5);
                if (this.timeSinceLastBulletPowerup >= Clash.configs.timeBulletPowerup) {
                    this.sprite.bulletType = 1;
                    this.timeSinceLastBulletPowerup = 0;
                    Clash.display.iconPowerup.kill();
                    Clash.display.progressPowerup.kill();
                }
            } else {
                this.sprite.bulletType = 2;
                Clash.display.iconPowerup.kill();
                Clash.display.progressPowerup.kill();
            }
        } else {
            if (Clash.itemNumberHadEaten > Clash.configs.maxItemPowerup) {
                if (Clash.itemNumberHadEaten < Clash.configs.maxItemPowerup * 2) {
                    this.timeSinceLastBulletPowerup2 += Clash.game.time.physicsElapsed;
                    Clash.display.progressPowerup.scale.setTo((Clash.configs.timeBulletPowerup - this.timeSinceLastBulletPowerup2 ) * 1.5 / (Clash.configs.timeBulletPowerup), 1.5);
                    if (this.timeSinceLastBulletPowerup2 >= Clash.configs.timeBulletPowerup) {
                        this.sprite.numberBullet = 1;
                        this.timeSinceLastBulletPowerup2 = 0;
                        Clash.display.iconPowerup.kill();
                        Clash.display.progressPowerup.kill();
                    }
                } else {
                    this.sprite.numberBullet = 3;
                    Clash.display.iconPowerup.kill();
                    Clash.display.progressPowerup.kill();
                }
            }
        }

        switch (this.sprite.bulletType) {
            case 1:
                Clash.display.weapon.frameName = 'cannon1.jpg';
                break;
            case 2:
                if (this.sprite.numberBullet == 3) {
                    Clash.display.weapon.frameName = 'rocket2.jpg';
                } else {
                    Clash.display.weapon.frameName = "cannon3.jpg";
                }
                break;
        }

        this.playerRevival();

        if (this.sprite.health <= 0) this.sprite.health = 0;

        Clash.display.shipHP.scale.setTo(this.sprite.health * 1.5 / this.configs.health, 1.5);

        if (!this.sprite.alive) return;

        this.sprite.rotation = Clash.game.physics.arcade.angleToPointer(this.sprite) + Math.PI / 2;

        this.moveShip();
        this.timeSinceLastFire += Clash.game.time.physicsElapsed;

        if (Clash.game.input.activePointer.isDown) {
            this.fire();
        }
        //powerUp bullet

    }

    playerRevival() {
        if (this.sprite.alive) {
            this.timeSinceLastRevival = 0;
        } else {
            this.timeSinceLastRevival += Clash.game.time.physicsElapsed;
            if (this.timeSinceLastRevival >= Clash.configs.timePlayerRevival) {
                this.sprite.reset(this.x, this.y, this.configs.health);
            }
        }
    }

    moveShip() {
        var radiusBeta = this.configs.radius + 10;

        var xPointer = Clash.game.input.activePointer.x;
        var yPointer = Clash.game.input.activePointer.y;

        var xCenter = Clash.game.width / 2;
        var yCenter = Clash.game.height / 2;

        var t = Math.pow(radiusBeta, 2) / (1 + Math.pow(((yPointer - yCenter) / (xPointer - xCenter)), 2));
        var x1 = -Math.sqrt(t) + xCenter;

        var y1 = (yPointer - yCenter) * (x1 - xCenter) / (xPointer - xCenter) + yCenter;

        var x2 = Math.sqrt(t) + xCenter;
        var y2 = (yPointer - yCenter) * (x2 - xCenter) / (xPointer - xCenter) + yCenter;
        // console.log("x1 =" + x1 +" y1 =" + y1);
        // console.log("x2 =" + x2 +" y2 =" + y2);

        var t1 = (Math.pow(xPointer - x1, 2) + Math.pow(yPointer - y1, 2));
        var t2 = (Math.pow(xPointer - x2, 2) + Math.pow(yPointer - y2, 2));

        if (t1 <= t2) {
            if (!isNaN(x1) && !isNaN(y1)) {
                this.x = x1;
                this.y = y1;
                Clash.game.physics.arcade.moveToXY(this.sprite, x1, y1, this.configs.shipSpeed);
            }
        } else {
            if (!isNaN(x2) && !isNaN(y2)) {
                this.x = x2;
                this.y = y2;
                Clash.game.physics.arcade.moveToXY(this.sprite, x2, y2, this.configs.shipSpeed);
            }
        }
    }


    fire() {
        if (this.timeSinceLastFire > this.configs.cooldown) {
            this.timeSinceLastFire = 0;
            switch (this.sprite.bulletType) {
                case 1:
                    // this.createBullet2(new Phaser.Point(0.5, 0.5), {angle:0});
                    this.createBullet1(new Phaser.Point(0.5, 0.5));
                    break;
                case 2:
                    if (this.sprite.numberBullet == 3) {
                        this.createBullet3(new Phaser.Point(0.5, 0.5), {angle: 0});
                    } else {
                        this.createBullet2(new Phaser.Point(0.5, 0.5), {angle: 0});
                    }

                    break;
                default:
                    break;

            }
        }
    }

    createBullet1(direction) {
        new BulletControllerType1(
            this.sprite.position,
            direction
        );
    }

    createBullet2(direction, configs) {
        new BulletControllerType2(
            this.sprite.position,
            direction, configs
        );
    }

    createBullet3(direction, configs) {
        new BulletControllerType3(
            this.sprite.position,
            direction, configs
        );
    }


}
