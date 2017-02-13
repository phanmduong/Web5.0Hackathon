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

// initialize the games
var create = function () {
    Clash.game.physics.startSystem(Phaser.Physics.ARCADE);
    Clash.keyboard = Clash.game.input.keyboard;

    Clash.background = Clash.game.add.tileSprite(0, 0, 1024, 1024, 'background');

    Clash.earth = new Earth(Clash.game.height / 2, Clash.game.width / 2, "base.png");

    Clash.ship = Clash.game.add.sprite(Clash.game.height / 2, Clash.game.width / 2 - Clash.earth.sprite.width / 2, "assets", "player1.png");
    Clash.ship.anchor = new Phaser.Point(0.5, 0.5);

    //Mọi công việc làm trước hàm này
    createDisplay();
}

var createDisplay = function () {
    createObjectDisplay(Clash.display.weapon,{x:70, y:70},"cannon1.jpg");

    createObjectDisplay(Clash.display.frameWeapon,{x:70, y:70},"weapon.png");

    //Clash.display.frameWeapon.scale.setTo(1.6, 1.6);

    createObjectDisplay(Clash.display.iconEarthHP,{x:150, y:190},"hp-detail.png");

    createObjectDisplay(Clash.display.iconEarthXP,{x:165, y:220},"xp-detail.png");

    createObjectDisplay(Clash.display.iconEarth,{x:70, y:190},"planet-small.png");

    createObjectDisplay(Clash.display.iconShipHP,{x:150, y:280},"hp-detail.png");

    createObjectDisplay(Clash.display.iconShipXP,{x:165, y:310},"xp-detail.png");
    Clash.display.iconShipXP = Clash.game.add.sprite(165, 310, "assets", "xp-detail.png");
    Clash.display.iconShipXP.anchor = new Phaser.Point(0.5, 0.5);
    Clash.display.iconShipXP.scale.setTo(1.5, 1.5);

    createObjectDisplay(Clash.display.iconShip,{x:70, y:280},"player1.png");
}

var createObjectDisplay= function(objectDislay, position, spriteName){
    objectDislay = Clash.game.add.sprite(position.x, position.y, "assets", spriteName);
    objectDislay.anchor = new Phaser.Point(0.5, 0.5);
    objectDislay.scale.setTo(1.5, 1.5);
}

// update game state each frame
var update = function () {
}

// before camera render (mostly for debug)
var render = function () {
}
