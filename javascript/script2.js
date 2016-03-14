var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('backdrop', 'asset/map.jpg');
    //game.load.image('card', 'asset/heroo.png');
    game.load.spritesheet('card','asset/heroo.png',30,30);
}

var card;
var cursors;
var moving = 0;

function create() {

    game.world.setBounds(0, 0, 1600, 1696);

    game.add.sprite(0, 0, 'backdrop');

    card = game.add.sprite(400, 300, 'card');
    
    card.anchor.setTo (0.5,0.5);
    card.animations.add('marche',[1, 7, 13],10,true);
    
    card.play('marche');
    
    card.animations.add('goUp',[2, 8, 14],10,true);
    card.animations.add('goDown',[11, 17, 23],10,true);
    
    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(toggle, this);

}

function anim(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
    card.scale.x=-1;
    card.play('marche');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
    card.scale.x=1;
    card.play('marche');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
    //card.scale.y=-1;
    card.play('goUp');
    }
     else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
    //card.scale.y=1;
    card.play('goDown');
    }
}

function toggle() {

    moving = (moving === 0) ? moving = 1 : moving = 0;

}

function update() {

    anim();
    if (moving === 0)
    {
        if (cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 4;
        }

        if (cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 4;
        }
    }
    else
    {
        if (cursors.left.isDown)
        {
            card.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            card.x += 4;
        }

        if (cursors.up.isDown)
        {
            card.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            card.y += 4;
        }
    }

}

function render() {

    //game.debug.cameraInfo(game.camera, 500, 32);
    //game.debug.spriteInfo(card, 32, 32);

    game.debug.text('Click to toggle sprite / camera movement with cursors', 32, 550);

}