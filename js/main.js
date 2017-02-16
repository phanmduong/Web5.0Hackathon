var Clash = {};
Clash.configs = {
    spawntimeEnemy: 0.6
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


// initialize the games
var create = function () {
    Clash.game.physics.startSystem(Phaser.Physics.ARCADE);
    Clash.keyboard = Clash.game.input.keyboard;

    Clash.background = Clash.game.add.tileSprite(0, 0, 1024, 1024, 'background');
    Clash.earth = new Earth(Clash.game.height / 2, Clash.game.width / 2, "base.png", {
        health : 30
    });

    //T.Hieu
    Clash.player = new ShipController(Clash.game.height / 2, Clash.game.width / 2 - Clash.earth.sprite.width / 2, "player1.png", {
        cooldown: 0.5,
        radius: 25,
        health : 20
    });

    Clash.enemyGroup = Clash.game.add.physicsGroup();       //T Dương
    Clash.playerBulletGroup = Clash.game.add.physicsGroup();


    //Tạo tàu địch
    Clash.enemies = [];
    Clash.timeSinceLastSpawmEnemies = 0;

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

// update game state each frame
var update = function () {

    Clash.game.physics.arcade.overlap(Clash.playerBulletGroup, Clash.enemyGroup, collisionBulletAndActor);
    Clash.game.physics.arcade.overlap(Clash.earth.sprite, Clash.enemyGroup, collisionWithObject);
    Clash.game.physics.arcade.overlap(Clash.player.sprite, Clash.enemyGroup, collisionWithObject);

    Clash.display.iconMouse.body.position = new Phaser.Point(Clash.game.input.activePointer.x, Clash.game.input.activePointer.y);

    Clash.player.update();
    Clash.earth.update();

    Clash.timeSinceLastSpawmEnemies += Clash.game.time.physicsElapsed;
    if (Clash.timeSinceLastSpawmEnemies > Clash.configs.spawntimeEnemy) {

        Clash.enemies.push(new EnemyUfo1Small1());
        Clash.enemies.push(new EnemyUfo1Big2());

        Clash.timeSinceLastSpawmEnemies = 0;
    }
}

// before camera render (mostly for debug)

var collisionBulletAndActor = function (bulletSprite, actorSprite) {
    bulletSprite.kill();
    actorSprite.kill();
}

var collisionWithObject = function (object, actorSprite) {
    actorSprite.kill();
    object.damage(1);
}

var render = function () {
    // Clash.enemyGroup.forEachAlive(renderGroup, this);
    // Clash.game.debug.body(Clash.display.iconMouse);
    // Clash.game.debug.body(Clash.earth.sprite);
    // // Clash.game.debug.spriteBounds(Clash.display.iconEarth);
    // Clash.game.debug.body(Clash.player.sprite);
}

function renderGroup(member) {
    Clash.game.debug.body(member);
}
