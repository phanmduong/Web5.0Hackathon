var Clash = {};
Clash.configs = {
    spawntimeEnemy: 4,
    timePlayerRevival: 2,
    timeBulletPowerup: 60,
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
    Clash.game.load.image('background2', 'Assets/background/background2.png');
    Clash.game.load.audio('backgroundMusic', 'audio/background.mp3');
    Clash.game.load.audio('shotcannon', 'audio/shot/shotcannon.wav');
    Clash.game.load.spritesheet('button', 'assets/playgame.png', 300, 54);
    Clash.game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);


}


// initialize the games
var create = function () {
    Clash.game.physics.startSystem(Phaser.Physics.ARCADE);
    Clash.keyboard = Clash.game.input.keyboard;


    Clash.background = Clash.game.add.tileSprite(0, 0, 1024, 1024, 'background');
    Clash.background2 = Clash.game.add.tileSprite(400, 250, 256, 256, 'background2');
    Clash.backgroundMusic = Clash.game.add.audio('backgroundMusic');
    Clash.backgroundMusic.volume = 5;
    Clash.backgroundMusic.loopFull();

    Clash.isPlaygame = false;
    Clash.playgame = Clash.game.add.button(Clash.game.height / 2, 800 , 'button', clickPlaygame, this, 1, 0);
    Clash.playgame.anchor = new Phaser.Point(0.5, 0.5);

    Clash.killAllObject = killAllObject;
    Clash.stateText = Clash.game.add.text(500,300,' ', { font: '84px Arial', fill: '#fff' });
    Clash.stateText.anchor.setTo(0.5, 0.5);
    Clash.stateText.visible = false;


}


var clickPlaygame = function () {
    createGame();
    Clash.isPlaygame = true;
    Clash.playgame.kill();
    Clash.stateText.visible = false;

}


var createGame = function () {
    Clash.background2.destroy();

    Clash.earth = new Earth(Clash.game.height / 2, Clash.game.width / 2, "base.png", {
        health: 10
    });

    Clash.playerBulletGroup = Clash.game.add.physicsGroup();

    Clash.player = new ShipController(Clash.game.height / 2, Clash.game.width / 2 - Clash.earth.sprite.width / 2, "player1.png", {
        cooldown: 0.5,
        radius: 34,
        health: 20,
        shipSpeed: 1000
    });

    Clash.enemyGroup = Clash.game.add.physicsGroup();

    Clash.itemGroup = Clash.game.add.physicsGroup();
    Clash.item = new ItemController("frame0000.png", {
        health: 1,
        type: 2
    })
    Clash.itemExist = true;
    Clash.itemNumberHadEaten = 0;

    Clash.enemies = [];
    Clash.timeSinceLastSpawmEnemies = 5;
    Clash.enemiesKilled = 0;


    Clash.cursors = Clash.game.input.keyboard.createCursorKeys();

    Clash.explosions = Clash.game.add.group();
    Clash.explosions.createMultiple(30, 'kaboom');
    Clash.explosions.forEach(setupInvader, this);



    //Mọi công việc làm trước hàm này
    createDisplay();

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

var update = function () {
    if (Clash.isPlaygame) {
        Clash.game.physics.arcade.collide(Clash.earth.sprite, Clash.player.sprite);
        Clash.game.physics.arcade.overlap(Clash.playerBulletGroup, Clash.enemyGroup, collisionBulletAndActor);
        Clash.game.physics.arcade.overlap(Clash.earth.sprite, Clash.enemyGroup, collisionWithObject);
        Clash.game.physics.arcade.overlap(Clash.player.sprite, Clash.enemyGroup, collisionWithObject);

        Clash.game.physics.arcade.overlap(Clash.playerBulletGroup, Clash.itemGroup, collisionBulletAndItem);

        Clash.display.iconMouse.body.position = new Phaser.Point(Clash.game.input.activePointer.x, Clash.game.input.activePointer.y);

        Clash.player.update();
        Clash.earth.update();

        Clash.timeSinceLastSpawmEnemies += Clash.game.time.physicsElapsed;
        if (Clash.timeSinceLastSpawmEnemies > 0.43 + (Clash.configs.spawntimeEnemy / (Clash.enemiesKilled / 10 + 1))) {

            Clash.enemies.push(new EnemyUfo1Small1());
            Clash.enemies.push(new EnemyUfo1Big2());

            Clash.timeSinceLastSpawmEnemies = 0;
        }
    }

}

var collisionBulletAndItem = function (bulletSprite, actorSprite) {
  var explosion = Clash.explosions.getFirstExists(false);
   explosion.reset(actorSprite.body.x+45, actorSprite.body.y+45);
   explosion.play('kaboom', 30, false, true);
    bulletSprite.kill();
    actorSprite.kill();
    Clash.itemExist = false;
    Clash.timeSinceLastItem = 0;
    Clash.itemNumberHadEaten++;
    Clash.player.sprite.bulletType = actorSprite.type;
}


var collisionBulletAndActor = function (bulletSprite, actorSprite) {
  var explosion = Clash.explosions.getFirstExists(false);
   explosion.reset(actorSprite.body.x+45, actorSprite.body.y+45);
   explosion.play('kaboom', 30, false, true);
    if (!bulletSprite.transparency)
        bulletSprite.kill();
    actorSprite.damage(

    );
    Clash.enemiesKilled++;
}

var collisionWithObject = function (object, actorSprite) {
  var explosion = Clash.explosions.getFirstExists(false);
   explosion.reset(actorSprite.body.x+45, actorSprite.body.y+45);
   explosion.play('kaboom', 30, false, true);

    object.damage(actorSprite.health);
    actorSprite.kill();

}

var killAllObject = function () {
    Clash.enemyGroup.forEachAlive(killObject, this);
    Clash.playerBulletGroup.forEachAlive(killObject, this);
    Clash.itemGroup.forEachAlive(killObject, this);
    killObject(Clash.player.sprite);
    killObject(Clash.display.earthHP);
    killObject(Clash.display.earthXP);
    killObject(Clash.display.shipHP);
    killObject(Clash.display.shipXP);
    killObject(Clash.display.frameWeapon);
    killObject(Clash.display.iconEarth);
    killObject(Clash.display.iconEarthHP);
    killObject(Clash.display.iconEarthXP);
    killObject(Clash.display.iconShipXP);
    killObject(Clash.display.iconShipHP);
    killObject(Clash.display.weapon);
    killObject(Clash.display.iconShip);
    killObject(Clash.display.iconMouse);
    Clash.background2.this.destroy();

}

var killObject = function (object) {
    object.kill();
}

var render = function () {
    // Clash.enemyGroup.forEachAlive(renderGroup, this);
    // Clash.playerBulletGroup.forEachAlive(renderGroup, this);
    // Clash.game.debug.body(Clash.display.iconMouse);
    // Clash.game.debug.body(Clash.earth.sprite);
    // // Clash.game.debug.spriteBounds(Clash.display.iconEarth);
    // Clash.game.debug.body(Clash.player.sprite);
    Clash.game.debug.text('Elapsed seconds: ' + Clash.game.time.totalElapsedSeconds(), 32, 32);
}
function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}
function renderGroup(member) {
    Clash.game.debug.body(member);
}
