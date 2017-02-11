var Clash = {};
Clash.configs = {};

window.onload = function () {
    Clash.game = new Phaser.Game(960, 960, Phaser.AUTO, '',
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

    Clash.background = Clash.game.add.tileSprite(0, 0, 960, 960, 'background');

    Clash.ship = Clash.game.add.sprite(Clash.game.width / 2, Clash.game.height / 2, "assets", "player1.png");
    Clash.ship.anchor = new Phaser.Point(0.5, 0.5);
    //Clash.ship.sprite.anchor = new Phaser.Point(0.5, 0.5);
}

// update game state each frame
var update = function () {

}

// before camera render (mostly for debug)
var render = function () {
}
