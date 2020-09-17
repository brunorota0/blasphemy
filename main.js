var config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var keyboard;
var player;
var text;

function preload() {
  this.load.setBaseURL("http://labs.phaser.io");
  this.load.image("gg", "assets/sprites/block.png");
}

function create() {
  keyboard = this.input.keyboard.createCursorKeys();
  player = this.physics.add.image(100, 100, "gg");
  player.setCollideWorldBounds(true);
  text = this.add
    .text(10, 10, "Development", { font: "16px Courier", fill: "#00ff00" })
    .setScrollFactor(0);
}

function update() {
  player.setVelocityY(500);
  if (keyboard.down.isDown) player.setVelocityY(500);
  else if (keyboard.up.isDown) player.setVelocityY(-500);

  if (keyboard.left.isDown) player.setVelocityX(-50);
  else if (keyboard.right.isDown) player.setVelocityX(50);

  //   text.setText(["player x: " + this.player.x, "player y: " + this.player.y]);
}
