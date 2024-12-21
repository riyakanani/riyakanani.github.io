var pacMan;
var monster1, monster2, monster3, monster4;
var w1, w2, w3, w4, w5, w6, w7, w8, w9, w13, w14, w15, w16,  w18, w19,w22, w23, w24, w25, w26, w27, w28, w29, w30, w31, w32, w33, w34, w35, w36, w37, w38;

var blueMonster, cherry, orangeMonster, pacman, pinkMonster, redMonster;

var p2,p3,p4,p5,p6,p7;

var score = 0;

var lives = 5;
var startButton;
var correct;

var mode = 0;
const welcome = 0;
const game = 1;
const question = 2;
const end = 3;

var optionButtonX = 70;
var optionButtonWidth = 20;
var correctChoice = 0;
var gotCorrect = -1;
var q1, a1, a2, a3;
var eatCount = 0;
var ghostOn = true;

function preload() {
  blueMonsterImage = loadImage("Blue Monster.png");
  cherryImage = loadImage("Cherry.png");
  orangeMonsterImage = loadImage("Orange Monster.png");
  pacmanImage = loadImage("Pacman.png");
  pinkMonsterImage = loadImage("Pink Monster.png");
  redMonsterImage = loadImage("Red Monster.png");
  backgroundImage = loadImage("background for pac man.jpg");

}

function setup() {
  createCanvas(400, 400);
  
  startButton = createButton('Start');
  startButton.position(175, 250);
  
  w1 = createSprite(300, 10, 590, 5);
  w2 = createSprite(300, 390, 590, 5);
  w3 = createSprite(10, 200, 5, 390);
  w4 = createSprite(390, 200, 5, 390);
  w5 = createSprite(50, 180, 5, 200);
  w6 = createSprite(190, 210, 200, 5);
  w7 = createSprite(155, 340, 200, 5);
  w8 = createSprite(340, 190, 5, 200);
  w9 = createSprite(190, 250, 200, 5);
  w13 = createSprite(275, 40, 135, 5);
  w14 = createSprite(110, 40, 135, 5);
  w15 = createSprite(190, 170, 200, 5);
  w16 = createSprite(190, 130, 200, 5);
  w18 = createSprite(190, 290, 200, 5);
  w19 = createSprite(190, 90, 200, 5);
  p2 = createSprite(190,270,13,13);
  p3 = createSprite(190,190,13,13);
  p4 = createSprite(190,230,13,13);
  p5 = createSprite(190,150,13,13);
  p6 = createSprite(190,110,13,13);
  blueMonster = createSprite(190, 145, 13, 13);
  orangeMonster = createSprite(190, 105, 13, 13);
  pinkMonster = createSprite(190, 190, 13, 13);
  redMonster = createSprite(190, 230, 13, 13);
  orangeMonster2 = createSprite(190, 270, 13, 13);
  pacman = createSprite(40, 370, 13, 13);
  pacman.addImage(pacmanImage);
  pacman.scale = 0.25;
  blueMonster.addImage(blueMonsterImage);
  blueMonster.scale = 0.3;
  orangeMonster.addImage(orangeMonsterImage);
  orangeMonster.scale = 0.3;
  pinkMonster.addImage(pinkMonsterImage);
  pinkMonster.scale = 0.3;
  redMonster.addImage(redMonsterImage);
  redMonster.scale = 0.3;
  orangeMonster2.addImage(orangeMonsterImage);
  orangeMonster2.scale = 0.3;
  cherry = createSprite(340,70,15,15);
  cherry.addImage(cherryImage);
  cherry.scale = 0.35;
  blueMonster.velocityX = 3;
  orangeMonster.velocityX = -3;
  pinkMonster.velocityX = -3;
  redMonster.velocityX = 3;
  orangeMonster2.velocityX = -3; 
}

function resetGhost(){
  ghostOn = true;
  blueMonster.x = 190;
  blueMonster.y = 145;
  orangeMonster.x = 190;
  orangeMonster.y = 105;
  pinkMonster.x = 190;
  pinkMonster.y = 190;
  redMonster.x = 190;
  redMonster.y = 230;
  orangeMonster2.x = 190;
  orangeMonster2.y = 270
  
  blueMonster.velocityX = 3;
  orangeMonster.velocityX = -3;
  pinkMonster.velocityX = -3;
  redMonster.velocityX = 3;
  orangeMonster2.velocityX = -3; 
}

function stopGhost() {
  ghostOn = false;
  blueMonster.velocityX = 0;
  orangeMonster.velocityX = 0;
  pinkMonster.velocityX = 0;
  redMonster.velocityX = 0;
  orangeMonster2.velocityX = 0; 
}

function draw() {
  background(0, 0, 0);
  
  if(lives == 0 || eatCount == 6){
    mode = end;
  } 
  
  if (mode == welcome){
    textSize(28);
    textAlign(CENTER, CENTER);
    text("Obstacles to Feeding Pacman", 200, 200);
    textSize(16);
    text("use arrow keys to play", 200, 230);
    startButton.mouseClicked(startGame);
    
  } else if (mode == game){
    if (ghostOn == false){
      resetGhost();
    }
    gameMode();
  } else if (mode == question){
    if(ghostOn == true){
      stopGhost();
    }
    questionMode();
    if(gotCorrect == 1 || gotCorrect == 0){
      mode = game;
    }
  } else if(mode == end){
    endMode();
  }
  
}

function gameMode(){
  w1.shapeColor = "red";
  w2.shapeColor = "orange";
  w3.shapeColor = "yellow";
  w4.shapeColor = "green";
  w5.shapeColor = "blue";
  w6.shapeColor = "purple";
  w7.shapeColor = "red";
  w8.shapeColor = "orange";
  w9.shapeColor = "yellow";
  w13.shapeColor = "red";
  w14.shapeColor = "orange";
  w15.shapeColor = "yellow";
  w16.shapeColor = "green";
  w18.shapeColor = "purple";
  w19.shapeColor = "red";
  p2.shapeColor = "orange";
  p3.shapeColor = "yellow";
  p4.shapeColor = "green";
  p5.shapeColor = "blue";
  p6.shapeColor = "purple";
  
  
  if (keyDown("left")) {
    pacman.x = pacman.x - 3;
  }

  if (keyDown("right")) {
    pacman.x = pacman.x + 3;
  }

  if (keyDown("down")) {
    pacman.y = pacman.y + 3;
  }

  if (keyDown("up")) {
    pacman.y = pacman.y - 3;
  }
  
  if(pacman.isTouching(cherry)){
    q1 = "The ______ is defined as the difference between actual yield and potential yield."
    a1 = "Difference in Yield"
    a2 = "Yield Loss"
    a3 = "Yield Gap"
    correctChoice = 3;
    
    if(gotCorrect == 1){
      pacman.x = 40;
      pacman.y = 370;
      cherry.destroy();
      score = score + 400;
      gotCorrect = -1;
      correctChoice = 0;
      eatCount += 1;
    } else if(gotCorrect == 0){
      pacman.x = 40;
      pacman.y = 370;
      lives = lives - 1;
      gotCorrect = -1;
      correctChoice = 0;
    }else{
      mode = question;
    }
    
  }

  if(pacman.isTouching(p2)){
    q1 = "Which of the following methods of saltwater intrusion management involve planting salt-tolerant crops and managing invasive species?"
    a1 = "Retreat"
    a2 = "Accommodate"
    a3 = "Protect"
    correctChoice = 2;
    
    if(gotCorrect == 1){
      pacman.x = 40;
      pacman.y = 370;
      p2.destroy();
      score = score + 20;
      gotCorrect = -1;
      correctChoice = 0;
      eatCount += 1;
    } else if(gotCorrect == 0){
      pacman.x = 40;
      pacman.y = 370;
      lives = lives - 1;
      gotCorrect = -1;
      correctChoice = 0;
    } else{
      mode = question;
    }
  }
  
  if(pacman.isTouching(p3)){
    q1 = "What is NOT one of Evan Fraser’s 4 strategies to feed 9.7B people?"
    a1 = "Science and Technology"
    a2 = "Intensification"
    a3 = "Local Food Systems"
    correctChoice = 2;
    
    if(gotCorrect == 1){
      pacman.x = 40;
      pacman.y = 370;
      p3.destroy();
      score = score + 20;
      gotCorrect = -1;
      correctChoice = 0;
      eatCount += 1;
    } else if(gotCorrect == 0){
      pacman.x = 40;
      pacman.y = 370;
      lives = lives - 1;
      gotCorrect = -1;
      correctChoice = 0;
    } else{
      mode = question;
    }
  }
  
  if(pacman.isTouching(p4)){
    q1 = "What percentage of freshwater is consumed by agriculture, domestic use, and industry, respectively?"
    a1 = "Agriculture: 70%; Domestic Use: 10%; Industry: 20%"
    a2 = "Agriculture: 70%; Domestic Use: 15%; Industry: 15%"
    a3 = "Agriculture: 50%; Domestic Use: 15%; Industry: 35%"
    correctChoice = 1;
    
    if(gotCorrect == 1){
      pacman.x = 40;
      pacman.y = 370;
      p4.destroy();
      score = score + 20;
      gotCorrect = -1;
      correctChoice = 0;
      eatCount += 1;
    } else if(gotCorrect == 0){
      pacman.x = 40;
      pacman.y = 370;
      lives = lives - 1;
      gotCorrect = -1;
      correctChoice = 0;
    } else{
      mode = question;
    }
  }
  
  if(pacman.isTouching(p5)){
    q1 = "What percentage of food is wasted in developed countries?"
    a1 = "35%"
    a2 = "50%"
    a3 = "40%"
    correctChoice = 3;
    
    if(gotCorrect == 1){
      pacman.x = 40;
      pacman.y = 370;
      p5.destroy();
      score = score + 20;
      gotCorrect = -1;
      correctChoice = 0;
      eatCount += 1;
    } else if(gotCorrect == 0){
      pacman.x = 40;
      pacman.y = 370;
      lives = lives - 1;
      gotCorrect = -1;
      correctChoice = 0;
    } else{
      mode = question;
    }
  }
  
  if(pacman.isTouching(p6)){
    q1 = "We currently produce enough food (calories) to feed the entire population."
    a1 = "True"
    a2 = "False"
    a3 = "Wrong Answer"
    correctChoice = 1;
    
    if(gotCorrect == 1){
      pacman.x = 40;
      pacman.y = 370;
      p6.destroy();
      score = score + 20;
      gotCorrect = -1;
      correctChoice = 0;
      eatCount += 1;
    } else if(gotCorrect == 0){
      pacman.x = 40;
      pacman.y = 370;
      lives = lives - 1;
      gotCorrect = -1;
      correctChoice = 0;
    } else{
      mode = question;
    }
  }

  if(pacman.isTouching(orangeMonster)||pacman.isTouching(blueMonster)||pacman.isTouching(orangeMonster2)||pacman.isTouching(pinkMonster)||pacman.isTouching(redMonster)){
    lives = lives - 1;
    pacman.x = 40;
    pacman.y = 370;
    
    if(lives === 0){
      textSize(30);
      fill("black");
      text("GAME OVER",300,200);
      blueMonster.velocityX = 0;
      orangeMonster.velocityX = 0;
      pinkMonster.velocityX = 0;
      redMonster.velocityX = 0;
      orangeMonster2.velocityX = 0; 
      pacman.destroy();
      
      
    }

  }
  fill("white");
  textSize(12);
  text("score:"+ score,320,30);
  text("lives:"+ lives,80,30);
  orangeMonster.bounceOff(w5);
  pinkMonster.bounceOff(w5);
  orangeMonster.bounceOff(w8);
  pinkMonster.bounceOff(w8);
  redMonster.bounceOff(w5);
  redMonster.bounceOff(w8);
  blueMonster.bounceOff(w5);
  blueMonster.bounceOff(w8);
  orangeMonster2.bounceOff(w5);
  orangeMonster2.bounceOff(w8);

  pacman.bounceOff(w1);
  pacman.bounceOff(w2);
  pacman.bounceOff(w3);
  pacman.bounceOff(w4);
  pacman.bounceOff(w5);
  pacman.bounceOff(w6);
  pacman.bounceOff(w7);
  pacman.bounceOff(w8);
  pacman.bounceOff(w9);
  pacman.bounceOff(w13);
  pacman.bounceOff(w14);
  pacman.bounceOff(w15);
  pacman.bounceOff(w16);
  pacman.bounceOff(w18);
  pacman.bounceOff(w19);
  drawSprites();
  
}

function startGame() {
  mode += 1;
  startButton.remove();
}

function questionMode() {
  square(50, 50, 300)
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text(q1, 50, 60, 300, 90);
  
  textSize(15);
  square(optionButtonX, 150, optionButtonWidth);
  textAlign(LEFT, TOP);
  text(a1, 100, 150, 300, 90);
  
  square(optionButtonX, 190, optionButtonWidth);
  text(a2, 100, 190, 300, 90);
  
  square(optionButtonX, 230, optionButtonWidth);
  text(a3, 100, 230, 300, 90);
  
}

function mouseClicked() {
  if (mode == question){
    if(
      mouseX > optionButtonX &&
      mouseX < optionButtonX + optionButtonWidth &&
      mouseY > 150 &&
      mouseY < 150 + optionButtonWidth
    ) {
      if(correctChoice == 1){
        gotCorrect = 1;
      } else {
        gotCorrect = 0;
      }
    } else if (
      mouseX > optionButtonX &&
      mouseX < optionButtonX + optionButtonWidth &&
      mouseY > 190 &&
      mouseY < 190 + optionButtonWidth
    ){
      if(correctChoice == 2){
        gotCorrect = 1;
      } else {
        gotCorrect = 0;
      }
    } else if (
      mouseX > optionButtonX &&
      mouseX < optionButtonX + optionButtonWidth &&
      mouseY > 230 &&
      mouseY < 230 + optionButtonWidth
    ){
      if(correctChoice == 3){
        gotCorrect = 1;
      } else {
        gotCorrect = 0;
      }
    }
  }
  
}

function endMode(){
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", 200, 200);
  textSize(16);
  text("Score: " + score, 200, 230);
}