var Clash = {};
Clash.configs = {
  spawmtime : 0.6
};
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

    //T.Hieu
    Clash.players = Clash.game.add.physicsGroup();
    Clash.players = new ShipController(Clash.game.height / 2, Clash.game.width / 2 - Clash.earth.sprite.width / 2, "player1.png");

    Clash.enemyGroup = Clash.game.add.physicsGroup();       //T Dương
    Clash.playerBulletGroup = Clash.game.add.physicsGroup();
    //Mọi công việc làm trước hàm này
    createDisplay();

    //Tạo tàu địch
    Clash.enemies = [];
    Clash.timeSinceLastSpawmEnemies = 0;
    Clash.enemiesShipTempX = Clash.game.height /2;
    Clash.enemiesShipTempY = Clash.game.width /2;
}

var createDisplay = function () {
    Clash.display.weapon = createObjectDisplay({x: 70, y: 70}, "cannon1.jpg", true);
    Clash.display.frameWeapon = createObjectDisplay({x: 70, y: 70}, "weapon.png", true);
    Clash.display.frameWeapon.scale.setTo(1.6, 1.6);
    Clash.display.earthHP = createObjectDisplay({x: 130, y: 177}, "hp-earth.png", false);
    Clash.display.shipHP = createObjectDisplay({x: 130, y: 266}, "hp-ship.png", false);
    Clash.display.earthXP = createObjectDisplay({x: 125, y: 215}, "xp-earth.png", false);
    Clash.display.shipXP = createObjectDisplay({x: 125, y: 305}, "xp-ship.png", false);
    Clash.display.iconEarthHP = createObjectDisplay({x: 150, y: 190}, "hp-detail.png", true);
    Clash.display.iconEarthXP = createObjectDisplay({x: 165, y: 220}, "xp-detail.png", true);
    Clash.display.iconEarth = createObjectDisplay({x: 70, y: 190}, "planet-small.png", true);
    Clash.display.iconShipHP = createObjectDisplay({x: 150, y: 280}, "hp-detail.png", true);
    Clash.display.iconShipXP = createObjectDisplay({x: 165, y: 310}, "xp-detail.png", true);
    Clash.display.iconShip = createObjectDisplay({x: 70, y: 280}, "player1.png", true);

    Clash.display.iconMouse = createObjectDisplay({x: 70, y: 70}, "clock1.png", true);

    Clash.game.physics.enable(Clash.display.iconMouse, Phaser.Physics.ARCADE);
    Clash.display.iconMouse.body.setCircle(10, Clash.display.iconMouse.height / 2 - 10, Clash.display.iconMouse.width / 2 - 10);

}

var createObjectDisplay = function (position, spriteName, isAnchor) {
    var objectDisplay = Clash.game.add.sprite(position.x, position.y, "assets", spriteName);
    if (isAnchor == true) {
        objectDisplay.anchor = new Phaser.Point(0.5, 0.5);
    }
    objectDisplay.scale.setTo(1.5, 1.5);
    return objectDisplay;

}

// update game state each frame
var update = function () {
    // console.log(Clash.game.input.activePointer);

    //  Clash.display.iconMouse.body.position = new Phaser.Point(Clash.game.input.activePointer.x, Clash.game.input.activePointer.y);
    //  ;

    // Clash.game.physics.arcade.moveToPointer(Clash.display.iconMouse, 10000);
    Clash.players.sprite.rotation = Clash.game.physics.arcade.angleToPointer(Clash.players.sprite)+ Math.PI / 2;

    // if (Clash.game.input.activePointer.isDown) {
    //     fire();
    // }
    // TDuong
    Clash.timeSinceLastSpawmEnemies += Clash.game.time.physicsElapsed;
    if (Clash.timeSinceLastSpawmEnemies>Clash.configs.spawmtime) {
        // Random tọa độ tạo thuyền địch
        Clash.enemiesShipTempX=Clash.game.world.randomX;
        Clash.enemiesShipTempY=Clash.game.world.randomY;
        while ( (Clash.enemiesShipTempX-Clash.game.height /2)*(Clash.enemiesShipTempX-Clash.game.height /2)+
          (Clash.enemiesShipTempY-Clash.game.width /2)*(Clash.enemiesShipTempY-Clash.game.width /2) < 200*200 ){
            Clash.enemiesShipTempX = Clash.game.world.randomX;
            Clash.enemiesShipTempY = Clash.game.world.randomY;
          }
        //Lựa chọn loại thuyền địch
        if ( (Clash.enemiesShipTempX+Clash.enemiesShipTempY)%2==1 ) {
          Clash.enemies.push(
            new EnemyUfo1Small1(Clash.enemiesShipTempX, Clash.enemiesShipTempY)
          );
        }
        else
        {
          Clash.enemies.push(
            new EnemyUfo1Big2(Clash.enemiesShipTempX, Clash.enemiesShipTempY)
          );
        }
        Clash.timeSinceLastSpawmEnemies = 0;
    }
}

function fire() {


  if (Clash.game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = Clash.game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        Clash.game.physics.arcade.moveToPointer(bullet, 300);
    }
    //Clash.game.physics.arcade.moveToPointer(Clash.ship, 300);


}


// function createBullet(direction) {
//     new PlayerBulletType1Controller(
//         Clash.game.input.pointer.position,
//         direction
//     );
// }
// before camera render (mostly for debug)
var render = function () {
    Clash.game.debug.body(Clash.display.iconMouse);
    Clash.game.debug.spriteBounds(Clash.earth.sprite);
    Clash.game.debug.spriteBounds(Clash.display.iconEarth);
    Clash.game.debug.spriteBounds(Clash.players.sprite);
}
