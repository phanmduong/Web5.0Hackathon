/**
 * Created by Ng T Duong on 2/14/2017.
 */
 class EnemyController {
  constructor(x,y,spriteName,configs){
    this.sprite = Clash.enemyGroup.create(
      x,
      y,
      "assets",
      spriteName
    );
    this.configs = configs;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.health = this.configs.health;

  }
}
