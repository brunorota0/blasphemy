var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false
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
var bulletsUI;
var shootCooldownUI;

var platforms;
var cursors;

var DEFAULT_BULLETS = 10;
var currentBullets = DEFAULT_BULLETS;

var DEFAULT_SHOOT_COOLDOWN = 10;
var currentShootCooldown = 0;

function preload() {
  this.load.setBaseURL("http://labs.phaser.io");

  this.load.image('sky', 'src/games/firstgame/assets/sky.png');
  this.load.image('ground', 'src/games/firstgame/assets/platform.png');
  this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
  this.add.image(400, 300, 'sky').setPipeline('Light2D').setAlpha(0.2);

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(200, 50, 'dude');

  this.lights.enable();
  this.lights.setAmbientColor(0x808080);

  var spotlight = this.lights.addLight(400, 300, 280).setIntensity(3);

  this.input.on('pointermove', function (pointer) {

      spotlight.x = pointer.x;
      spotlight.y = pointer.y;

  });

  var colors = [
    0xffffff, 0xff0000, 0x00ff00, 0x00ffff, 0xff00ff, 0xffff00
];

var currentColor = 0;

this.input.on('pointerdown', function (pointer) {

    currentColor++;

    if (currentColor === colors.length)
    {
        currentColor = 0;
    }

    spotlight.setColor(colors[currentColor]);

});

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();


  this.physics.add.collider(player, platforms);

  player.setCollideWorldBounds(true);

  text = this.add
    .text(10, 10, "Development", { font: "16px Courier", fill: "#00ff00" })
    .setScrollFactor(0);

  bulletsUI = this.add
    .text(10, 30, currentBullets, { font: "16px Courier", fill: "#00ff00" })
    .setScrollFactor(0);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.space.isDown) {
    if (currentBullets > 0 && currentShootCooldown <= 0) {
      player.setVelocityY(-200);
      currentBullets--;
      currentShootCooldown = DEFAULT_SHOOT_COOLDOWN

      bulletsUI.text = currentBullets;
    }else {
      currentShootCooldown--;
    }
  }

  if (player.body.touching.down) {
    currentBullets = DEFAULT_BULLETS;
    bulletsUI.text = currentBullets;
  }
}