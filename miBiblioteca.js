function spawnTerodactil(){
    if (frameCount % 60 === 0) {
      tero = createSprite(600,120,40,10);
      tero.y = Math.round(random(10,60));
      tero.addImage(teroImg);
      tero.scale = 0.1;
      //tero.scale = 0.5;
      tero.velocityX = -10;
      
       //asigna ciclo de vida a la variable
      tero.lifetime = 200;
          
      //añade cada nube al grupo
      teroGroup.add(tero);
    }
  }
  function bloquea(){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    teroGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    teroGroup.setLifetimeEach(-1);
  }
  function spawnClouds() {
    //escribe aquí el código para aparecer las nubes
    if (frameCount % 60 === 0) {
      var cloud = createSprite(600,120,40,10);
      cloud.y = Math.round(random(10,60));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
      cloud.velocityX = -3;
      
       //asigna ciclo de vida a la variable
      cloud.lifetime = 200;
      
      //ajusta la profundidad
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;
      
      //añade cada nube al grupo
      cloudsGroup.add(cloud);
    }
    
  }
  
  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //genera obstáculos al azar
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
        default: break;
      }
      
      //asigna escala y ciclo de vida al obstáculo           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //añade cada obstáculo al grupo
      obstaclesGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    teroGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    
    score = 0;
    
  }