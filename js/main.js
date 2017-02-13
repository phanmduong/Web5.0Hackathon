var Clash = {};
Clash.configs = {};
Clash.display = {};

window.onload = function () {
    Clash.game = new Phaser.Game(1024, 1024, Phaser.AUTO, '',
        {
            preload: preload,
            create: create,
            update: update,
            render: render
        }, false, false
    );
}

// preparations before game starts
var preload = function () {
    Clash.game.scale.minWidth = 512;
    Clash.game.scale.minHeight = 512;
    Clash.game.scale.maxWidth = 1024;
    Clash.game.scale.maxHeight = 1024;
    Clash.game.scale.pageAlignHorizontally = true;
    Clash.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Clash.game.time.advancedTiming = true;

    Clash.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Clash.game.load.image('background', 'Assets/background/space1.jpg');
}

var bullets;
var fireRate = 100;
var nextFire = 0;

// initialize the games
var create = function () {
    Clash.game.physics.startSystem(Phaser.Physics.ARCADE);
    Clash.keyboard = Clash.game.input.keyboard;

    Clash.background = Clash.game.add.tileSprite(0, 0, 1024, 1024, 'background');
    Clash.earth = new Earth(Clash.game.height / 2, Clash.game.width / 2, "base.png");

    Clash.ship = Clash.game.add.sprite(Clash.game.height / 2, Clash.game.width / 2 - Clash.earth.sprite.width / 2, "assets", "player1.png");
    Clash.ship.anchor = new Phaser.Point(0.5, 0.5);

    Clash.playerBulletGroup = Clash.game.add.physicsGroup();
    //Mọi công việc làm trước hàm này
    createDisplay();
}

var createDisplay = function () {
    Clash.display.weapon  = createObjectDisplay({x:70, y:70},"cannon1.jpg");
    Clash.display.frameWeapon = createObjectDisplay({x:70, y:70},"weapon.png");
    Clash.display.frameWeapon.scale.setTo(1.6, 1.6);
    Clash.display.iconEarthHP = createObjectDisplay({x:150, y:190},"hp-detail.png");
    Clash.display.iconEarthXP = createObjectDisplay({x:165, y:220},"xp-detail.png");
    Clash.display.iconEarth = createObjectDisplay({x:70, y:190},"planet-small.png");
    Clash.display.iconShipHP = createObjectDisplay({x:150, y:280},"hp-detail.png");
    Clash.display.iconShipXP = createObjectDisplay({x:165, y:310},"xp-detail.png");
    Clash.display.iconShip = createObjectDisplay({x:70, y:280},"player1.png");

}

var createObjectDisplay= function(position, spriteName){
   var objectDisplay = Clash.game.add.sprite(position.x, position.y, "assets", spriteName);
    objectDisplay.anchor = new Phaser.Point(0.5, 0.5);
    objectDisplay.scale.setTo(1.5, 1.5);
    return objectDisplay;
}

// update game state each frame
var update = function () {
    Clash.ship.rotation = Clash.game.physics.arcade.angleToPointer(Clash.ship)+Math.PI/2;
    if (Clash.game.input.activePointer.isDown)
    {
        fire();
    }
}

function fire() {


   Clash.game.physics.arcade.moveToPointer(Clash.ship, 300);


}

function createBullet(direction){
    new PlayerBulletType1Controller(
      Clash.game.input.pointer.position,
      direction
    );
  }
// before camera render (mostly for debug)
var render = function () {
    Clash.game.debug.spriteInfo(Clash.ship , 32, 100);
}
