class ItemController {
    constructor(spriteName, configs) {
        this.distanceMinWithEarth = 400;
        this.randomLocation();
        this.sprite = Clash.itemGroup.create(
            this.x,
            this.y,
            "assets",
            spriteName
        );
        this.configs = configs;
        this.sprite.type = this.configs.type;
        this.configs = configs;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.health = this.configs.health;
        Clash.game.physics.arcade.moveToObject(this.sprite, Clash.earth.sprite, this.configs.enemySpeed);
    }

    randomLocation() {

        do {
            this.x = Clash.game.world.randomX;
            this.y = Clash.game.world.randomY;

            if (Math.sqrt((this.x - Clash.game.height / 2) * (this.x - Clash.game.height / 2) +
                    (this.y - Clash.game.width / 2) * (this.y - Clash.game.width / 2)) >= this.distanceMinWithEarth) break;
        } while (true);
    }

    update(){
      if (Clash.itemExist == false) {
        Clash.timeSinceLastItem += Clash.game.time.physicsElapsed;
        if (Clash.timeSinceLastItem > 30) {
          Clash.itemExist = true;
          Clash.item = new ItemController("frame0000.png", {
              health: 1,
              type: 2
          })
        }
      }
    }
}
