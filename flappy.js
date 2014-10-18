// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score=0;
var label_score;
//alert(score);
var player;
var pipes;



/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy.png");
    game.load.audio("score","assets/point.ogg");
    game.load.image("pipe", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade
    // set the background colour of the scene
game.stage.setBackgroundColor("#B4E6FF");
//game.add.text(250,200,"Hello flappish bird!",{font:"30px Arial", fill:"#660033"});
//game.add.sprite(10,10, "playerImg");
//game.add.sprite(10,400-54, "playerImg");
//game.add.sprite(790-50,10, "playerImg");
//game.add.sprite(790-50,400-54, "playerImg");
game.input.onDown.add(clickHandler);
game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    //score = 100;
//    alert(score);
    score = score + 1;
   // alert(score);
//    game.add.text(50,50, score);
    var x = 60;
    var y = 200;








   // var right_key = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
   //right_key.onDown.add(moveRight);
  //var left_key = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  // left_key.onDown.add(moveLeft);
    var up_key = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    up_key.onDown.add(player_jump);
  // var down_key = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
   // down_key.onDown.add(moveDown);

    var pipe_interval = 1.75
    game.time.events.loop(pipe_interval*Phaser.Timer.SECOND,generate_pipe);


    //game.add.text(20,20,"Clap");
    //game.add.text(20,40,"Clap");
    //game.add.text(20,60,"Clap");
    //game.add.text(20,80,"Clap");
    //game.add.text(20,100,"Clap");
    //var y=200;


    pipes = game.add.group();



    player = game.add.sprite(x,y, "playerImg");
    player.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(player);
    player.checkWorldBounds = true;

    player.body.gravity.y = 300;
    player.body.velocity.y = -150;

    player.x = 300;
    player.y = 300;

    label_score = game.add.text(20,20,"",{font: "30px Arial", fill: "#fff"});

}

function player_jump() {
    player.body.velocity.y = -200;

}

function add_pipe_part(x,y,pipe_part){
    var pipe = pipes.create(x,y,pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;

}

function generate_pipe() {
    var hole = Math.floor(Math.random() * 5) + 1;
    var holeSize = Math.random()*4+2;
    for (var count = 0; count < hole; count++) {
        var x = 800+20;
        var y = 50 * count;
        add_pipe_part(x, y, "pipe");

    }

    for (var count = hole + holeSize; count < 8; count++) {
        var x = 800+20;
        var y = 50 * count;
        add_pipe_part(x, y, "pipe");


        // var y = 50*count;
        //game.add.sprite(300,y, "pipe");
    }

    score++;

    label_score.setText(score);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    game.physics.arcade.overlap(player,pipes,game_over)

}

function game_over(){

    //alert("YOU ARE DEAD, MATE!")
    location.reload();


}
function clickHandler(mouse) {
    player.x=mouse.x;
    player.y=mouse.y;
}
function spaceHandler () {
    game.sound.play("score");

 }
function moveLeft(){
    player.x-=20;
}
function moveRight(){
    player.x+=20;
}
function moveUp(){
    player.y-=20;
}
function moveDown(){
    player.y+=20;

}