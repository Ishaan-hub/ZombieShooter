var PLAY =1;
var END = 0
var gameState = PLAY; 
var shooter,shooter_running, shooter_collided;
var zombie_running;
var bullet_Image;
var zombieGroup, bulletsGroup;
var track_Image;
var life = 3;
var kills = 0;

function preload(){
  shooter_running = loadAnimation("S1.png","S2.png","S3.png","S4.png","S5.png","S6.png")
  zombie_running = loadAnimation("Z1.png","Z2.png","Z3.png","Z4.png","Z5.png","Z6.png")

  bullet_Image = loadImage('bullet.png')
  track_Image = loadImage('track.jpg')
}

function setup(){
  createCanvas(900,600)

  bg = createSprite(450,0,1200,800)
  bg.addImage(track_Image)
  bg.y = bg.height/2;
  bg.velocityY=-5
  bg.scale = 2

  shooter = createSprite(500,500,20,20)
  shooter.addAnimation("running",shooter_running);
  shooter.scale = 0.3

  zombieGroup = new Group();
  bulletsGroup = new Group();




}
function draw(){
  background("brown") 


  if(gameState===PLAY){
    shooter.velocityY = 0;
    shooter.velocityX = 0;

  spawnZombies();

  if(keyDown("space"))
  shootBullets();
  



  if(keyDown('LEFT_ARROW')){
    shooter.velocityX = -4
  }
  if(keyDown('RIGHT_ARROW')){
    shooter.velocityX = 4;
  }
  for (var i = 0; i < zombieGroup.length; i++)
   { 
     if (zombieGroup.get(i).isTouching(bulletsGroup)) 
     { 
       zombieGroup.get(i).destroy();
       kills +=1;
  }
}
  
  if(bg.y<0){
    bg.y= bg.height/2
  }

  if(zombieGroup.isTouching(shooter)){
    zombieGroup.destroyEach();
    life -= 1;

  }
  if(life === 0){
    gameState = END;
  }

}
else if(gameState === END){
  shooter.velocityX = 0;
  zombieGroup.destroyEach();

}
  drawSprites();
  stroke('black')
  fill('red')
  textSize(50)
  text("Life:"+ life , 500,50)
  text("Kills:"+ kills , 700,50)
}

function spawnZombies(){
   if(frameCount % 100 === 0){
     var zombie = createSprite(600,10,20,20);
     zombie.x = Math.round(random(800,200))
     zombie.velocityY = 1;
     zombie.addAnimation("running",zombie_running);
     zombie.scale = 0.3

     zombie.lifetime = 1000;

     zombieGroup.add(zombie);
   }
}

function shootBullets(){
  if(frameCount % 5===0){
    var bullets = createSprite(1000,5000,10,20);
    bullets.addImage('bullet',bullet_Image)
    bullets.scale = 0.03
    bullets.x = shooter.x
    bullets.y = shooter.y
    bullets.velocityY = -5;

    bullets.depth = shooter.depth;
    shooter.depth = shooter.depth+1

    bulletsGroup.add(bullets);

    bullets.lifetime= 333;
  }
}
