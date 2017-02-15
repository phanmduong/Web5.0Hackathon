class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Clash.game.add.sprite(
            x,
            y,
            "assets",
            spriteName
        );

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);

        // this.sprite.body.setCircle(50, this.sprite.width / 2 - 50,
        //     this.sprite.height / 2 - 50);
    }

    update(){
      this.sprite.rotation = Clash.game.physics.arcade.angleToPointer(this.sprite) + Math.PI / 2;
      if (Clash.game.input.activePointer.isDown) {
        this.fire();
      }
    }

     //Clash.bullets = this.createBullet(new Phaser.Point(0.5, 0.5));
    // var fireRate = 100;
    // var nextFire = 0;
    fire(){
      // if(!this.sprite.alive) return;
      // this.createBullet(Clash.game.pointer.direction);

     if (Clash.game.time.now > Clash.configs.nextFire )
     {
        Clash.configs.nextFire = Clash.game.time.now + Clash.configs.fireRate;
        //var bullets = this.createBullet(new Phaser.Point(0.5, 0.5));
        //var bullet = bullets.getFirstDead();
        //
        // bullet.reset(sprite.x - 8, sprite.y - 8);
        //var bullet = new BulletControllerType1(this.sprite.position,this.sprite.direction);


        //Clash.game.physics.arcade.moveToPointer(bullet, 300);
        this.createBullet(new Phaser.Point(0.5, 0.5));
      }
    }

    createBullet(direction){
    new BulletControllerType1(
      this.sprite.position,
      direction
      );
    }



}
