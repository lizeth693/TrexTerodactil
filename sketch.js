var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var terodactil , teroImg, teroGroup;
var score=0;
var vidas = 3;
var gameOver, restart, perdiste, perdisteImg;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  teroImg = loadImage("tero.png");
  groundImage = loadImage("ground2.png");
  perdisteImg = loadImage("perdiste.jpg");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  perdiste =createSprite(300,100);
  perdiste.addImage(perdisteImg);
  perdiste.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
  perdiste.visible = false;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  teroGroup = new Group();
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Puntuación: "+ score, 500,50);
  if(vidas === 3 || vidas === 2 || vidas === 1){
     text("Vidas: "+vidas,500,70);
  }
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    spawnTerodactil();

    if(obstaclesGroup.isTouching(trex)||teroGroup.isTouching(trex)){
      vidas = vidas - 1;
      if(vidas === 0){
        bloquea();        
        perdiste.visible = true;
        gameOver.visible = false;
        restart.visible = false;
        
        
      }else{
        gameState = END;
      }
     
    }
  }
  else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      bloquea();
      trex.changeAnimation("collided",trex_collided);
      if(mousePressedOver(restart)) {
        reset();
      }
  }
  drawSprites();
}

