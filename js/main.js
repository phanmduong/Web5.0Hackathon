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
    Clash.display.weapon = Clash.game.add.sprite(10, 10, "assets", "cannon1.jpg");
    Clash.ship.weapon = new Phaser.Point(0.5, 0.5);

    Clash.display.frameWeapon = Clash.game.add.sprite(10, 10, "assets", "weapon.png");
    Clash.ship.frameWeapon = new Phaser.Point(0.5, 0.5);


}

// update game state each frame
var update = function () {
}

// before camera render (mostly for debug)
var render = function () {
}
