var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    game.load.tilemap('map', 'asset/map/objets.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'asset/pkm.png');
    game.load.image('background', 'asset/map/map.png');
    game.load.spritesheet('player', 'asset/mypnj.png', 15, 15);
    game.load.image('pikachu', 'asset/pika.png');
    game.load.image('ptera', 'asset/ptera.png');
    game.load.bitmapFont('carrier_command', 'asset/font/carrier_command.png', 'asset/font/carrier_command.xml');

    game.load.image('rock', 'asset/stone.png');

    game.load.image('box', 'asset/box_pkm.png');
    game.load.image('fondVert', 'asset/vert2.png');
    
    game.load.image('anim', 'asset/pnj3.png');
    
    game.load.spritesheet('inventory', 'asset/mini_chest.png', 193, 71);
    game.load.image('openInventory', 'asset/chest.png');

    game.load.image('bulbizarre', 'asset/bulbi.png');
    //    game.load.image('bigbulbizarre', 'asset/bulbizarrezarre.png');
    game.load.image('ectoplasma', 'asset/ecto.png');
    //    game.load.image('bigectoplasma', 'asset/bigectoplasma.png');

    game.load.spritesheet('quit', 'asset/quit.png', 50, 50);
    
    game.load.spritesheet('mayor', 'asset/mayor.png', 32, 32);
 
    for(var i= 1; i <8; i++)
        {
            game.load.spritesheet('pnj'+i, 'asset/pnj'+i+'.png', 32, 32);
        }

    game.load.image('pnj_quest', 'asset/bulbizarre.png');


}

var map; //obstacles
var layer;
var cursors;
var inventory;
var player;
var pikachu;
var ptera;
var rock;
var pokemon = '';

var bulbizarre;
var ectoplasma;


var pnj_quest;
var pnj;

var tab_chest = [];
var quit;

var bpmText;
var inventory;

var box;
var text;
var bravo;
var bravoBox;
var merci;
var hello;
var hello2;
var hello3;

var fondVert;
var bonjour;


var isFinite;
var finish = [];


function create() {

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map', 16, 16);
    game.add.sprite(0, 0, 'background');

    pikachu = game.add.sprite(50, 270, 'pikachu');
    rock = game.add.sprite(740, 182, 'rock');

    bulbizarre = game.add.sprite(360, 25, 'bulbizarre');
    ectoplasma = game.add.sprite(112, 365, 'ectoplasma');
    
    ptera = game.add.sprite(892, 237, 'ptera');
    
    anim = game.add.sprite(700, 645, 'anim');
    sprite3 = game.add.sprite(145, 530, 'bulbizarre');
    pnj_quest = game.add.sprite(545, 412, 'mayor');
 
    
    function new_pnj(x, y) {
            nb = Math.floor(Math.random() * 7) + 1;
            game.add.sprite(x, y, 'pnj'+nb);
    }
    
    new_pnj(1234, 71);
    new_pnj(925, 95);
    new_pnj(1325, 264);
    new_pnj(1064, 340);
    new_pnj(890, 285);
    new_pnj(1358, 462);
    new_pnj(1343, 25);
    new_pnj(540, 1129);
    new_pnj(1106, 1138);
    new_pnj(109, 909);
    new_pnj(87, 1526);
    new_pnj(457, 1452);
    new_pnj(716, 1363);
    new_pnj(1000, 1463);
    new_pnj(1443, 1380);
    new_pnj(1457, 910);
    new_pnj(1485, 669);
    new_pnj(220, 604);
    


    game.physics.enable(pikachu, Phaser.Physics.ARCADE);
    pikachu.body.immovable = true;

    //deplacer rocher
    game.physics.enable(rock, Phaser.Physics.ARCADE);

    game.physics.enable(bulbizarre, Phaser.Physics.ARCADE);
    bulbizarre.body.immovable = true;

    game.physics.enable(ptera, Phaser.Physics.ARCADE);
    ptera.body.immovable = true;

    game.physics.enable(ectoplasma, Phaser.Physics.ARCADE);
    ectoplasma.body.immovable = true;

    game.physics.enable(pnj_quest, Phaser.Physics.ARCADE);
    pnj_quest.body.immovable = true;

    //  Now add in the tileset
    map.addTilesetImage('tiles');

    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();



    //  This isn't totally accurate, but it'll do for now
    map.setCollision([4, 18, 19, 176, 177, 475, 507, 508, 509, 510, 511, 638, 665, 666, 667, 668, 669, 763, 764, 765, 796, 823, 824, 825, 826, 827, 921, 922, 923, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1079, 1080, 1081, 1139, 1140, 1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1237, 1238, 1239, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 1530, 1531, 1532, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1774, 1775, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1834, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1863, 1864, 1865, 1866, 1867, 1868, 1869, 1896, 1897, 1898, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2054, 2055, 2056, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2150, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2158, 2159, 2160, 2161, 2162, 2163, 2164, 2165, 2166, 2167, 2168, 2169, 2170, 2171, 2172, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2214, 2248, 2249, 2250, 2251, 2252, 2253, 2254, 2255, 2256, 2308, 2309, 2310, 2311, 2312, 2313, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2337, 2338, 2339, 2340, 2341, 2342, 2343, 2406, 2407, 2413, 2414, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2485, 2486, 2487, 2488, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2528, 2529, 2530, 2558, 2559, 2560, 2561, 2562, 2624, 2625, 2626, 2627, 2628, 2629, 2630, 2631, 2632, 2633, 2634, 2635, 2636, 2637, 2638, 2639, 2640, 2641, 2642, 2643, 2660, 2661, 2662, 2663, 2664, 2686, 2687, 2688, 2696, 2697, 2716, 2717, 2718, 2719, 2720, 2741, 2742, 2743, 2744, 2745, 2782, 2783, 2784, 2785, 2786, 2787, 2788, 2789, 2790, 2791, 2792, 2796, 2797, 2798, 2799, 2800, 2801, 2818, 2819, 2820, 2821, 2822, 2844, 2845, 2846, 2854, 2855, 2874, 2875, 2876, 2877, 2878, 2882, 2883, 2884, 2899, 2900, 2901, 2902, 2903, 2954, 2955, 2956, 2957, 2958, 2959, 2976, 2977, 2978, 2979, 2980, 3002, 3003, 3004, 3012, 3013, 3032, 3033, 3034, 3035, 3036, 3040, 3041, 3042, 3057, 3058, 3059, 3060, 3061, 3112, 3113, 3114, 3115, 3116, 3117, 3134, 3135, 3136, 3137, 3138, 3160, 3161, 3162, 3163, 3190, 3191, 3192, 3193, 3194, 3198, 3199, 3200, 3215, 3216, 3217, 3218, 3219, 3292, 3293, 3294, 3295, 3296, 3318, 3319, 3320, 3321, 3328, 3329, 3373, 3374, 3375, 3376, 3377, 3486, 3487, 3644, 3645, 4204, 4205, 4206, 4207, 4208, 4362, 4363, 4364, 4365, 4366, 4520, 4521, 4522, 4523, 4524, 4678, 4679, 4680, 4681, 4682, 5125, 5126, 5127, 5128, 5283, 5284, 5285, 5286, 5382, 5383, 5384, 5441, 5442, 5443, 5444, 5540, 5542, 5599, 5600, 5601, 5602, 5698, 5699, 5700, 5757, 5758, 5759, 5760, 5869, 6027, 6067, 6068, 6069, 6070, 6071, 6225, 6226, 6227, 6228, 6229, 6327, 6328, 6329, 6383, 6384, 6385, 6386, 6387, 6485, 6487, 6495, 6541, 6542, 6543, 6544, 6545, 6643, 6644, 6645, 6699, 6700, 6701, 6702, 6703, 6794, 6861, 6869, 6870, 6871, 6872, 6873, 6874, 6952, 7027, 7028, 7029, 7030, 7031, 7032, 7111, 7185, 7186, 7187, 7188, 7189, 7190, 7285, 7343, 7344, 7345, 7346, 7347, 7348, 7443, 7502, 7503, 7504, 7505, 7506, 7660, 7661, 7662, 7663, 7664, 7762, 7763, 7920, 7921, 8078, 8079, 9057, 9058, 9059, 9060, 9061, 9215, 9216, 9217, 9218, 9219, 9222, 9333, 9334, 9335, 9336, 9337, 9338, 9339, 9340, 9341, 9342, 9343, 9373, 9374, 9375, 9376, 9377, 9380, 9491, 9492, 9493, 9494, 9495, 9496, 9497, 9498, 9499, 9500, 9501, 9531, 9532, 9533, 9534, 9535, 9649, 9650, 9651, 9652, 9653, 9654, 9655, 9656, 9657, 9658, 9659, 9807, 9808, 9809, 9810, 9811, 9812, 9813, 9814, 9815, 9816, 9817, 9965, 9966, 9967, 9968, 9969, 9970, 9971, 9972, 9973, 9974, 9975, 10126, 10127, 10128, 10129, 10130, 10765, 10766, 10767, 10914, 10915, 10916, 10923, 10924, 10925, 10955, 10956, 10957, 10958, 10959, 10960, 10961, 10962, 10963, 11072, 11073, 11074, 11081, 11082, 11083, 11113, 11114, 11115, 11116, 11117, 11118, 11119, 11120, 11121, 11230, 11231, 11232, 11237, 11238, 11239, 11240, 11241, 11242, 11271, 11272, 11273, 11274, 11275, 11276, 11277, 11278, 11279, 11395, 11396, 11397, 11398, 11399, 11400, 11429, 11430, 11431, 11432, 11433, 11434, 11435, 11436, 11437, 11553, 11554, 11555, 11556, 11557, 11558, 11587, 11588, 11589, 11590, 11591, 11592, 11593, 11594, 11595, 11745, 11746, 11747, 11748, 11749, 11750, 11751, 11752, 11753, 11755, 11756, 11763, 11764, 11765, 11913, 11914, 11921, 11923, 12071, 12072, 12079, 12080, 12081, 12236, 12237, 12238, 12394, 12396, 12552, 12553, 12554, 12703, 12704, 12705, 12706, 12708, 12709, 12710, 12711, 12861, 12862, 12863, 12864, 12866, 12867, 12868, 12869, 13019, 13020, 13021, 13022, 13024, 13025, 13026, 13027, 13177, 13178, 13179, 13180, 13181, 13182, 13183, 13335, 13336, 13337, 13338, 13339, 13340, 13497, 13499, 13655, 13657, 13813, 13814, 13815, 13981, 13982, 13983, 14140, 14141, 14544, 14545, 14546, 14547, 14548, 14549, 14550, 14551, 14552, 14553, 14554, 14555, 14702, 14703, 14704, 14705, 14706, 14707, 14708, 14709, 14710, 14711, 14712, 14713, 14860, 14861, 14862, 14863, 14864, 14865, 14866, 14867, 14868, 14869, 14870, 14871, 15018, 15019, 15020, 15021, 15022, 15023, 15024, 15025, 15026, 15027, 15028, 15029, 15048, 15049, 15050, 15051, 15176, 15177, 15178, 15179, 15180, 15181, 15182, 15183, 15184, 15185, 15186, 15187, 15206, 15207, 15208, 15209, 15334, 15335, 15336, 15337, 15338, 15339, 15340, 15341, 15342, 15343, 15344, 15345, 15364, 15365, 15366, 15367, 15492, 15493, 15494, 15495, 15496, 15497, 15498, 15499, 15500, 15501, 15502, 15503, 15522, 15523, 15524, 15525, 64954]);


    //  Un-comment this on to see the collision tiles
    //Layer.debug = true;

    //  Player
    player = game.add.sprite(80, 270, 'player', 1);

    //premier param, le nom de l'animation, tableau optio. de ce qu'il y a a afficher, temps anim
    player.animations.add('left', [8, 9], 10, true);
    player.animations.add('right', [3, 4], 10, true);
    player.animations.add('up', [5, 6, 7], 10, true);
    player.animations.add('down', [0, 1, 2], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(10, 14, 2, 1);

    game.camera.follow(player);
    

    cursors = game.input.keyboard.createCursorKeys();

    var help = game.add.text(16, 16, 'Arrows to move', {
        font: '14px Arial',
        fill: 'black'
    });
    help.fixedToCamera = true;
    

    inventory = game.add.sprite(670, 520, 'inventory');
    //    inventory = game.add.button(670, 520, 'inventory', actionOnClick, this, 2, 1, 0);
    inventory.fixedToCamera = true;

    pnj_quest.animations.add('run');
    anim.animations.add('shuffle');
    

    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    pnj_quest.animations.play('run', 15, true);
    
    anim.animations.play('shuffle', 20, true);

    //    game.add.tween(pnj_quest).to({ x: 300 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    tweenA = game.add.tween(pnj_quest).to({
        x: 600
    }, 2000, "Quart.easeOut");
    tweenB = game.add.tween(pnj_quest).to({
        y: 500
    }, 2000, "Quart.easeOut");

    tweenA.chain(tweenB);
    //    tweenC.chain(tweenD);
    tweenA.start();

  
    
    //= game.add.sprite(700, 645, 'anim');



    drag(bulbizarre);
    drag(ectoplasma);
    drag(pikachu);
    drag(ptera);
    

           bonjour = game.add.text(300, 380, " Bienvenue ! Pour vous déplacer utilisez les flèches. \n Pour rendre un pokémon, utilisez la souris", {
                font: '14px Arial',
                fill: 'black'
            });
            fondVert = game.add.sprite(280, 300, "fondVert");
            bonjour.bringToTop();
                        
                    game.time.events.add(3200, function() {
                    
                        game.world.remove(bonjour);
                        game.world.remove(fondVert);
                    
                
                }, this);
    
    
    
} //fin create

function drag(poke) {

    poke.inputEnabled = true;
    poke.input.enableDrag();
    poke.events.onDragStart.add(onDragStart, this);
    poke.events.onDragStop.add(onDragStop, this);
}

function onDragStart(sprite, pointer) {

    var result = "Dragging " + sprite.key;
    console.log(result);

}

function onDragStop(sprite, pointer) {

//    var result = sprite.key + " dropped at x:" + pointer.x + " y: " + Math.round(pointer.y);
    var result2 = sprite.key + " dropped at x:" + pointer.position.x + " y: " + pointer.position.y;
    console.log(result2);

    sprite.bringToTop();
    

//    if (pnj_quest.body.x >= 580 && pnj_quest.body.x <= 600 && pnj_quest.body.y >= 490 && pnj_quest.body.y <= 520) {
        if (sprite.body.x >= 580 && sprite.body.x <= 620 && sprite.body.y >= 490 && sprite.body.y <= 540) {
        console.log("compris !");
        
        bravoBox = game.add.sprite(250, 350, 'box');
        merci = game.add.text(300, 380, sprite.key + " a été rendu, merci !", {
            font: '14px Arial',
            fill: 'black'
        });
        game.time.events.add(1200, function() {
            game.world.remove(merci);
            game.world.remove(bravoBox);
            game.world.remove(sprite);
        finish.push(sprite);

        }, this);
    }

}


var lastDiscuss = 0;


function update() {
    
      var animate = game.add.tween(pnj_quest).to({
        x: 710
    }, 2000, "Quart.easeOut");
    var animate2 = game.add.tween(pnj_quest).to({
        y: 650
    }, 2000, "Quart.easeOut");

    game.physics.arcade.collide(player, layer);

    player.body.velocity.set(0);

    if (cursors.left.isDown) {
        player.body.velocity.x = -100;
        player.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 100;
        player.play('right');
    } else if (cursors.up.isDown) {
        player.body.velocity.y = -100;
        player.play('up');
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 100;
        player.play('down');
    } else {
        player.animations.stop();
    }


    //ramassage pokemon

    if (game.physics.arcade.collide(player, bulbizarre)) {

        bravoBox = game.add.sprite(250, 350, 'box');
        bravo = game.add.text(300, 380, "Bulbizarre trouvé !", {
            font: '14px Arial',
            fill: 'black'
        });
        tab_chest.push("bulbizarre");
        console.log(tab_chest);


        bulbizarre.kill();

        bulbizarre.reset(680, 530);
        bulbizarre.bringToTop();
        bulbizarre.fixedToCamera = true;

        game.time.events.add(1500, function() {
            game.world.remove(bravo);
            game.world.remove(bravoBox);

        }, this);
    }


    if (game.physics.arcade.collide(player, ectoplasma)) {

        bravoBox = game.add.sprite(250, 350, 'box');
        bravo = game.add.text(300, 380, "ectoplasma trouvé !", {
            font: '14px Arial',
            fill: 'black'
        });
        tab_chest.push("ectoplasma");
        console.log(tab_chest);

        ectoplasma.kill();

        ectoplasma.reset(700, 520);
        ectoplasma.bringToTop();
        ectoplasma.fixedToCamera = true;

        game.time.events.add(1200, function() {
            game.world.remove(bravo);
            game.world.remove(bravoBox);

        }, this);
    }
    
     if (game.physics.arcade.collide(player, pikachu)) {

        bravoBox = game.add.sprite(250, 350, 'box');
        bravo = game.add.text(300, 380, "pikachu trouvé !", {
            font: '14px Arial',
            fill: 'black'
        });
        tab_chest.push("pikachu");
        console.log(tab_chest);

        pikachu.kill();

        pikachu.reset(730, 520);
        pikachu.bringToTop();
        pikachu.fixedToCamera = true;

        game.time.events.add(1200, function() {
            game.world.remove(bravo);
            game.world.remove(bravoBox);

        }, this);
    }

        if (game.physics.arcade.collide(player, ptera)) {

        bravoBox = game.add.sprite(250, 350, 'box');
        bravo = game.add.text(300, 380, "ptera trouvé !", {
            font: '14px Arial',
            fill: 'black'
        });
        tab_chest.push("ptera");
        console.log(tab_chest);

        ptera.kill();

        ptera.reset(680, 550);
        ptera.fixedToCamera = true;
        ptera.bringToTop();
        

        game.time.events.add(1200, function() {
        game.world.remove(bravo);
        game.world.remove(bravoBox);

        }, this);
    }
    
    


var phrase;
var phrase2;
    
    //PNJ
    if (game.physics.arcade.collide(player, pnj_quest)) {
        //afficher texte "as tu mon pokémon ?"
        var bravoBox2 = game.add.sprite(250, 350, 'box');
        var bravo2 = game.add.text(300, 380, "Bonjour ! Je suis le maire de la ville.", {
            font: '14px Arial',
            fill: 'black'
        });


        game.time.events.add(1200, function() {
            game.world.remove(bravo2);

            phrase = game.add.text(300, 380, "Il y a eu une tempête... \n Tu pourrais retrouver les pokémons échappés ?", {
                font: '14px Arial',
                fill: 'black'
            });



        }, this);

        game.time.events.add(3200, function() {
        game.world.remove(phrase);


            var texte = game.add.text(300, 380, " Je reste ici, tu n'auras \n qu'à les glisser de ton inventaire.", {
                font: '14px Arial',
                fill: 'black'
            });
                        
                    game.time.events.add(3200, function() {
                        game.world.remove(bravoBox2);
                        game.world.remove(texte);
                    
                
                }, this);
                     
        }, this);
 
                }
    
                if (game.physics.arcade.collide(player, rock)) {
                    rock.animations.stop();
                    rock.body.velocity.x = 0;
                }


    
                if(finish.length == 4) {
                
                var bravoBox3 = game.add.sprite(player.body.x, player.body.y, 'fondVert');
                var fini = game.add.text(player.body.x, player.body.y+100, " Merci, vous avez retrouvé les 3 pokémons !", {
                font: '14px Arial',
                fill: 'black'
            });
                }

            } //fin update


function render() {

    //game.debug.body(player);
}