class ItemController {
  constructor(x,y,spriteName,configs){
    this.sprite = Clash.itemGroup.create(
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
