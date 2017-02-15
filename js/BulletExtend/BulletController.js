class BulletController{
  constructor(position, spriteName, direction, physicsGroup){
    this.sprite = Clash.playerBulletGroup.create(
      position.x,
      position.y,
      "assets",
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.angle = Math.atan2(direction.x, -direction.y) * (180/Math.PI);
    this.sprite.body.velocity = direction.setMagnitude(Clash.configs.bulletSpeed);
  }
}
