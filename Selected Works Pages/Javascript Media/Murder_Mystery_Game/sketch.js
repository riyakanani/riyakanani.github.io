// Canvas height and width variables
let width = 900;
let height = 600;

let imgWidth = 600 / 2;
let imgHeight = 500 / 2;

// Controls text variables
let textheight;
let instructions;
let instructions2;

// Evidence screen variables
let ev1;
let ev2;
let ev3;

// Variables used for mug shot photos
let riyaX = width / 4 - imgWidth / 2;
let riyaY = height / 4;
let danikaX = 3 * (width / 4) - imgWidth / 2;
let danikaY = height / 4;

// Dimensions for next and previous buttons
let nextButtonX = width - 30 - 120;
let nextButtonWidth = 120;
let nextButtonY = height - 60 - 10;
let nextButtonHeight = 40;
let prevButtonX = 30;
let prevButtonWidth = nextButtonWidth;
let prevButtonY = nextButtonY;
let prevButtonHeight = nextButtonHeight;

// Qualities of the murders
let rand;
let object;
let faveColor;
let number;

// Used to change screen
var screen = 0;

// Game Elements

// Clicker Game
// Stores weapons for flying objects game
let weapons = [];
// Depends on who the true criminal is
let targetWeapon;
// User's prediction (0 = riya 1 = danika)
let prediction;

// For keys Game
// Values to control the number
let keys;
let keysValue = 5;
let keysNum;

// Values to keep track of whether the number was found or not
let foundNumber;

// For door game
// Width, height, and location of doors
let door1ButtonX = 100;
let door1ButtonY = 200;
let door1ButtonWidth = 100;
let door1ButtonHeight = 200;

let door2ButtonX = 300;
let door2ButtonY = 200;
let door2ButtonWidth = 100;
let door2ButtonHeight = 200;

let door3ButtonX = 500;
let door3ButtonY = 200;
let door3ButtonWidth = 100;
let door3ButtonHeight = 200;

let door4ButtonX = 700;
let door4ButtonY = 200;
let door4ButtonWidth = 100;
let door4ButtonHeight = 200;

// Keeps track of random door picked and which is open
let randDoor;
let openDoor = 0;

// Image variables
let detectiveImage;
let AlyssaObituaryImage;
let riyaMugshot;
let danikaMugshot;
let knifeImage;
let batImage;

// Music Variables
let iRememberClifford;
let dunDunDunnn;
let gameMusic;
let suspectMusic;
let winSound;
let loseSound;

// Perdiction screen
let winPlayed = 0;
let losePlayed = 0;

// Values for jail cell background
let col0 = -100;
let col1 = 0;
let col2 = 100;
let col3 = 200;
let col4 = 300;
let col5 = 400;
let col6 = 500;
let col7 = 600;
let col8 = 700;
let col9 = 800;

// Creating weapons only when a new game is played
let firstLoopWeapon = 1; //riya
let dunPlayed = 0;

// Loading all of the images and sound
function preload() {
  iRememberClifford = loadSound("sounds/iRememberClifford.mp3");
  detectiveImage = loadImage("images/detective.png");

  dunDunDunnn = loadSound("sounds/dunDunDunnn.mp3");
  AlyssaObituaryImage = loadImage("images/alyssObituary.jpg");

  riyaMugshot = loadImage("images/riyaMugshot.jpg");
  danikaMugshot = loadImage("images/danikaMugshot.jpg");

  gameMusic = loadSound("sounds/gameMusic.m4a");
  suspectMusic = loadSound("sounds/suspectMusic.m4a");
  knifeImage = loadImage("images/knife.png");
  batImage = loadImage("images/baseballBat.png");

  startBackground = loadImage("blood-spatter-png-clipart-11.png");
  gameBackground = loadImage("crime.png");

  winSound = loadSound("sounds/winSound.mp3");
  loseSound = loadSound("sounds/loseSound.mp3");
}

// Creates canvas, background, and chooses new random variable every time the game restarts
function setup() {
  createCanvas(width, height);
  background(0);
  resetGame();
  print(rand);
}

// Changing between screens (Each screen coded in a function)
function draw() {
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    murdererScreen();
  } else if (screen == 2) {
    suspectScreen();
  } else if (screen == 3) {
    clickerGameScreen();
  } else if (screen == 4) {
    evidenceScreen1();
  } else if (screen == 5) {
    doorGameScreen();
  } else if (screen == 6) {
    evidenceScreen2();
  } else if (screen == 7) {
    keysGameScreen();
  } else if (screen == 8) {
    evidenceScreen3();
  } else if (screen == 9) {
    predictionScreen();
  } else if (screen == 10) {
    resultScreen();
  }
}

// Start Game Screen
function startScreen() {
  // Controls sound
  if (!iRememberClifford.isPlaying()) {
    iRememberClifford.play();
    iRememberClifford.setVolume(0.25);
  }

  // Makes current Screen background
  startScreenBackground();
  noTint();

  //  Creates text
  textheight = 100;
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Murder Mystery", width / 2, textheight);

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.5) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Murder Mystery", width / 2, (textheight += 20));

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Murder Mystery", width / 2, (textheight += 20));

  // Controls image on start screen
  let imageLength = 250;
  image(
    detectiveImage,
    width / 2 - imageLength / 2,
    height / 2 - imageLength / 2,
    imageLength,
    imageLength
  );

  // Instructions on start screen
  drawWords("Click Anywhere To Begin", width / 2, 500, 40, CENTER, 255, 0, 0);
}

// Who was murdered desciption slide
function murdererScreen() {
  // This screens song
  if (!dunDunDunnn.isPlaying() && dunPlayed == 0) {
    suspectMusic.stop();
    dunDunDunnn.play();
    dunDunDunnn.setVolume(0.5);
    dunPlayed = 1;
  }
  if (!dunDunDunnn.isPlaying() && !suspectMusic.isPlaying()) {
    suspectMusic.play();
    suspectMusic.setVolume(0.5);
  }

  // Added screen background
  murdererScreenBackground();
  noTint();
  image(AlyssaObituaryImage, 100, height / 4 - 50, 90 * 3, 90 * 4);

  // Obituary
  let wordHeight = 125;
  drawWords(
    "Alyssa Was Murdered!!!",
    3 * (width / 4) - 50,
    wordHeight,
    40,
    CENTER,
    255,
    0,
    0
  );

  drawWords(
    "Obituary:",
    3 * (width / 4) - 50,
    (wordHeight += 50),
    30,
    CENTER,
    255,
    0,
    0
  );

  drawWords(
    "Alyssa Gabriela Mazzone, 20, of College Park, Maryland,",
    3 * (width / 4) - 50,
    (wordHeight += 50),
    15,
    CENTER,
    255,
    255,
    255
  );

  drawWords(
    "was murdered on December 8th. Alyssa is survived by her parents. ",
    3 * (width / 4) - 50,
    (wordHeight += 50),
    15,
    CENTER,
    255,
    255,
    255
  );

  drawWords(
    "Alyssa was born on the 26th of July in a Maryland,",
    3 * (width / 4) - 50,
    (wordHeight += 50),
    15,
    CENTER,
    255,
    255,
    255
  );

  drawWords(
    "to parents Mr. and Mrs. Mazzone.",
    3 * (width / 4) - 50,
    (wordHeight += 50),
    15,
    CENTER,
    255,
    255,
    255
  );

  drawWords(
    "She graduated from Patuxent High School in 2020 with a diploma.",
    3 * (width / 4) - 50,
    (wordHeight += 50),
    15,
    CENTER,
    255,
    255,
    255
  );

  drawWords(
    "She was loved by many.",
    3 * (width / 4) - 50,
    (wordHeight += 50),
    15,
    CENTER,
    255,
    255,
    255
  );

  // Adds next/prev screen button
  nextButton();
  prevButton();
}

// Suspects desciption slide
function suspectScreen() {
  if (!suspectMusic.isPlaying()) {
    suspectMusic.play();
    suspectMusic.setVolume(0.5);
  }
  suspectScreenBackground(0);
  drawWords("Who Murdered Alyssa!??", width / 2, 80, 60, CENTER, 255, 0, 0);

  noTint();
  let imgWidth = 600 / 2;
  let imgHeight = 500 / 2;

  //riyas suspect info
  drawWords("Suspect 1:", width / 4, height / 4 - 10, 30, CENTER, 255, 0, 0);
  image(riyaMugshot, width / 4 - imgWidth / 2, height / 4, imgWidth, imgHeight);
  let textHeight = height / 4 + imgHeight;
  drawWords(
    "Name: Riya Kanani",
    width / 4,
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );
  drawWords(
    "Favorite Color: Red",
    width / 4,
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );
  drawWords(
    "Career: Chef",
    width / 4,
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );
  drawWords(
    "Birthyear: 1920",
    width / 4,
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );

  //danika suspect info
  drawWords(
    "Suspect 2:",
    3 * (width / 4),
    height / 4 - 10,
    30,
    CENTER,
    255,
    0,
    0
  );
  image(
    danikaMugshot,
    3 * (width / 4) - imgWidth / 2,
    height / 4,
    imgWidth,
    imgHeight
  );
  textHeight = height / 4 + imgHeight;
  drawWords(
    "Name: Danika Perez",
    3 * (width / 4),
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );
  drawWords(
    "Favorite Color: Blue",
    3 * (width / 4),
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );
  drawWords(
    "Career: Baseball Player",
    3 * (width / 4),
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );
  drawWords(
    "Birthyear: 1913",
    3 * (width / 4),
    (textHeight += 25),
    15,
    CENTER,
    255,
    0,
    0
  );

  // Adds next/prev screen button
  nextButton();
  prevButton();
}

// Clicker game. The bottom bar is size 100
function clickerGameScreen() {
  // Adds music to screen
  if (!gameMusic.isPlaying()) {
    gameMusic.play();
    gameMusic.setVolume(0.1);
  }

  // Creates the weapons which fly around only when a game is created.
  if (firstLoopWeapon == 1) {
    gameScreenBackground();
    while (weapons.length > 0) {
      weapons.pop();
    }

    // Adds weapons to the array
    for (i = 0; i < 5; i++) {
      weapons.push(
        new Weapon(
          createVector(random(width), random(height)),
          p5.Vector.random2D().mult(random(10)),
          40,
          color(255, 255, 255, 255),
          0
        )
      );
    }

    for (i = 0; i < 5; i++) {
      weapons.push(
        new Weapon(
          createVector(random(width), random(height)),
          p5.Vector.random2D().mult(random(10)),
          40,
          color(255, 255, 255, 255),
          1
        )
      );
    }

    weapons.push(
      (targetWeapon = new Weapon(
        createVector(random(width), random(height)),
        p5.Vector.random2D().mult(random(10)),
        40,
        faveColor,
        rand
      ))
    );
    firstLoopWeapon = 0;
  }

  // Adds background to screen
  gameScreenBackground();

  // Sets instructions
  instructions = "Click the right" + " " + object;

  // Prints the word in the color of the real criminal
  if (rand == 0) {
    drawWords(instructions, width / 2, 580, 60, CENTER, 255, 0, 0);
  } else if (rand == 1) {
    drawWords(instructions, width / 2, 580, 60, CENTER, 0, 0, 255);
  }

  //Moves the weapons around the screen
  for (let i = 0; i < weapons.length; i++) {
    for (let j = 0; j < i; j++) {
      weapons[i].collide(weapons[j]);
    }
  }

  for (let i = 0; i < weapons.length; i++) {
    weapons[i].move();
    weapons[i].render();
  }
}

// First evidence screen
function evidenceScreen1() {
  // Music playing
  if (!gameMusic.isPlaying()) {
    gameMusic.play();
    gameMusic.setVolume(0.1);
  }

  // Background of screen
  evidenceScreensBackground();

  // Sets evidence words
  ev1 = "Our Suspect killed with an object the color " + faveColor;
  drawWords(ev1, width / 2, 250, 40, CENTER, 255, 255, 255);
  textheight = 100;
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, textheight);

  //text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.5) * 100) - 40;
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, (textheight += 20));

  //text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, (textheight += 20));

  // Adds next screen button
  nextButton();
}

// Door game screen
function doorGameScreen() {
  // Game music
  if (!gameMusic.isPlaying()) {
    gameMusic.play();
    gameMusic.setVolume(0.1);
  }

  // Game background
  gameScreenBackground();
  textSize(30);
  fill(255, 0, 0);

  // Words added to screen
  instructions = "Open the doors to find the right object";
  instructions2 = "Alyssa was killed with!";
  drawWords(instructions, width / 2, 50);
  drawWords(instructions2, width / 2, 100);

  // Switches door shape based on if its open or closed
  // Shape for open door
  if (openDoor == 1) {
    fill(255, 255, 255);
    rect(door1ButtonX, door1ButtonY, door1ButtonWidth, door1ButtonHeight);
    fill(255, 0, 0);
    quad(
      door1ButtonX + 10,
      door1ButtonY,
      door1ButtonX + 10,
      door1ButtonY + door1ButtonHeight,
      door1ButtonX - 50,
      door1ButtonY + door1ButtonHeight + 25,
      door1ButtonX - 50,
      door1ButtonY - 25
    );
    stroke(0, 0, 0);
    ellipse(door1ButtonX - 30, 320, 10, 10);
    noStroke();
    fill(255, 255, 255, 40);
    triangle(
      door1ButtonX - 50,
      door1ButtonY + door1ButtonHeight + 25,
      door1ButtonX + 10,
      door1ButtonY + door1ButtonHeight,
      door1ButtonX + door1ButtonWidth,
      door1ButtonY + door1ButtonHeight
    );

    fill(255, 0, 0);

    rect(door2ButtonX, door2ButtonY, door2ButtonWidth, door2ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door2ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door3ButtonX, door3ButtonY, door3ButtonWidth, door3ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door3ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door4ButtonX, door4ButtonY, door4ButtonWidth, door4ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door4ButtonX + 70, 300, 10, 10);
    noStroke();

    // Checks if it is random door
    if (randDoor == 0) {
      if (object == "bat") {
        noTint();
        image(batImage, door1ButtonX + 25, door1ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      } else {
        noTint();
        image(knifeImage, door1ButtonX + 25, door1ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      }
    }
  } else if (openDoor == 2) {
    fill(255, 255, 255);
    rect(door2ButtonX, door2ButtonY, door2ButtonWidth, door2ButtonHeight);
    fill(255, 0, 0);
    quad(
      door2ButtonX + 10,
      door2ButtonY,
      door2ButtonX + 10,
      door2ButtonY + door2ButtonHeight,
      door2ButtonX - 50,
      door2ButtonY + door2ButtonHeight + 25,
      door2ButtonX - 50,
      door2ButtonY - 25
    );
    stroke(0, 0, 0);
    ellipse(door2ButtonX - 30, 320, 10, 10);
    noStroke();
    fill(255, 255, 255, 40);
    triangle(
      door2ButtonX - 50,
      door2ButtonY + door2ButtonHeight + 25,
      door2ButtonX + 10,
      door2ButtonY + door2ButtonHeight,
      door2ButtonX + door2ButtonWidth,
      door2ButtonY + door2ButtonHeight
    );

    fill(255, 0, 0);

    rect(door1ButtonX, door1ButtonY, door1ButtonWidth, door1ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door1ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door3ButtonX, door3ButtonY, door3ButtonWidth, door3ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door3ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door4ButtonX, door4ButtonY, door4ButtonWidth, door4ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door4ButtonX + 70, 300, 10, 10);
    noStroke();

    // Checks if it is random door
    if (randDoor == 1) {
      if (object == "bat") {
        noTint();
        image(batImage, door2ButtonX + 25, door2ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      } else {
        noTint();
        image(knifeImage, door2ButtonX + 25, door2ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      }
    }
  } else if (openDoor == 3) {
    fill(255, 255, 255);
    rect(door3ButtonX, door3ButtonY, door3ButtonWidth, door3ButtonHeight);
    // ellipse(door1ButtonX + 70, 300, 10, 10);
    fill(255, 0, 0);
    quad(
      door3ButtonX + 10,
      door3ButtonY,
      door3ButtonX + 10,
      door3ButtonY + door3ButtonHeight,
      door3ButtonX - 50,
      door3ButtonY + door3ButtonHeight + 25,
      door3ButtonX - 50,
      door3ButtonY - 25
    );
    stroke(0, 0, 0);
    ellipse(door3ButtonX - 30, 320, 10, 10);
    noStroke();
    fill(255, 255, 255, 40);
    triangle(
      door3ButtonX - 50,
      door3ButtonY + door3ButtonHeight + 25,
      door3ButtonX + 10,
      door3ButtonY + door3ButtonHeight,
      door3ButtonX + door3ButtonWidth,
      door3ButtonY + door3ButtonHeight
    );

    fill(255, 0, 0);
    rect(door1ButtonX, door1ButtonY, door1ButtonWidth, door1ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door1ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door2ButtonX, door2ButtonY, door2ButtonWidth, door2ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door2ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door4ButtonX, door4ButtonY, door4ButtonWidth, door4ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door4ButtonX + 70, 300, 10, 10);
    noStroke();

    // Checks if it is random door
    if (randDoor == 2) {
      if (object == "bat") {
        noTint();
        image(batImage, door3ButtonX + 25, door3ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      } else {
        noTint();
        image(knifeImage, door3ButtonX + 25, door3ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      }
    }
  } else if (openDoor == 4) {
    fill(255, 255, 255);
    rect(door4ButtonX, door4ButtonY, door4ButtonWidth, door4ButtonHeight);
    // ellipse(door1ButtonX + 70, 300, 10, 10);
    fill(255, 0, 0);
    quad(
      door4ButtonX + 10,
      door4ButtonY,
      door4ButtonX + 10,
      door4ButtonY + door3ButtonHeight,
      door4ButtonX - 50,
      door4ButtonY + door3ButtonHeight + 25,
      door4ButtonX - 50,
      door4ButtonY - 25
    );
    stroke(0, 0, 0);
    ellipse(door4ButtonX - 30, 320, 10, 10);
    noStroke();
    fill(255, 255, 255, 40);
    triangle(
      door4ButtonX - 50,
      door4ButtonY + door4ButtonHeight + 25,
      door4ButtonX + 10,
      door4ButtonY + door4ButtonHeight,
      door4ButtonX + door4ButtonWidth,
      door4ButtonY + door4ButtonHeight
    );

    fill(255, 0, 0);
    rect(door1ButtonX, door1ButtonY, door1ButtonWidth, door1ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door1ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door2ButtonX, door2ButtonY, door2ButtonWidth, door2ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door2ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door3ButtonX, door3ButtonY, door3ButtonWidth, door3ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door3ButtonX + 70, 300, 10, 10);
    noStroke();

    // Checks if it is random door
    if (randDoor == 3) {
      if (object == "bat") {
        noTint();
        image(batImage, door4ButtonX + 25, door4ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      } else {
        noTint();
        image(knifeImage, door4ButtonX + 25, door4ButtonY + 100, 50, 50);

        // Adds next screen button
        nextButton();
      }
    }
  } else {
    fill(255, 0, 0);
    rect(door1ButtonX, door1ButtonY, door1ButtonWidth, door1ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door1ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door2ButtonX, door2ButtonY, door2ButtonWidth, door2ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door2ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door3ButtonX, door3ButtonY, door3ButtonWidth, door3ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door3ButtonX + 70, 300, 10, 10);
    noStroke();

    rect(door4ButtonX, door4ButtonY, door4ButtonWidth, door4ButtonHeight);
    stroke(0, 0, 0);
    ellipse(door4ButtonX + 70, 300, 10, 10);
    noStroke();
  }
}

// Second evidence screen
function evidenceScreen2() {
  // Starts music
  if (!gameMusic.isPlaying()) {
    gameMusic.play();
    gameMusic.setVolume(0.1);
  }

  // Sets background
  evidenceScreensBackground();

  // Text for evidence
  ev1 = "Our Suspect killed with an object the color " + faveColor;
  ev2 = "Our Suspect killed Alyssa using a " + object;

  drawWords(ev1, width / 2, 250, 40, CENTER, 255, 255, 255);
  drawWords(ev2, width / 2, 350, 40, CENTER, 255, 255, 255);
  textheight = 100;
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, textheight);

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.5) * 100) - 40;
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, (textheight += 20));

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, (textheight += 20));

  // Adds next screen button
  nextButton();
}

// Keys game
function keysGameScreen() {
  // Added music
  if (!gameMusic.isPlaying()) {
    gameMusic.play();
    gameMusic.setVolume(0.1);
  }

  // Creates backgroud
  gameScreenBackground();

  // Text at the top
  instructions = "Use your up and down arrow keys to see how many";
  instructions2 = "times Alyssa was killed!";
  drawWords(instructions, width / 2, 50, 30, CENTER, 255, 0, 0);
  drawWords(instructions2, width / 2, 100, 30, CENTER, 255, 0, 0);

  // When number is found
  if (keysValue == number) {
    foundNumber = true;
    keysNum = drawWords(
      keysValue,
      width / 2,
      height / 2 + 200,
      380,
      CENTER,
      255,
      0,
      0
    );

    // Adds next screen button
    nextButton();
  } else {
    // Draws number
    foundNumber = false;
    keysNum = drawWords(
      keysValue,
      width / 2,
      height / 2 + 200,
      380,
      CENTER,
      255,
      255,
      255
    );
  }
}

// Used for keys screen
function keyPressed() {
  if (keyCode == UP_ARROW && keysValue < 30) {
    keysValue += 1;
  } else if (keyCode == DOWN_ARROW && keysValue > 0) {
    keysValue -= 1;
  }
}

// 3rd Evidence screen
function evidenceScreen3() {
  // Adds music
  if (!gameMusic.isPlaying()) {
    gameMusic.play();
    gameMusic.setVolume(0.1);
  }

  // Adds background
  evidenceScreensBackground();

  // Adds text
  ev1 = "Our Suspect killed with an object the color " + faveColor;
  ev2 = "Our Suspect killed Alyssa using a " + object;
  ev3 = "Alyssa was killed " + number + " times";

  drawWords(ev1, width / 2, 250, 40, CENTER, 255, 255, 255);
  drawWords(ev2, width / 2, 350, 40, CENTER, 255, 255, 255);
  drawWords(ev3, width / 2, 450, 40, CENTER, 255, 255, 255);

  textheight = 100;
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, textheight);

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.5) * 100) - 40;
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, (textheight += 20));

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(60);
  textAlign(CENTER);
  text("Evidence Update:", width / 2, (textheight += 20));

  // Adds next screen button
  nextButton();
}

// Prediction Screen
function predictionScreen() {
  // Music added to screen
  if (!suspectMusic.isPlaying()) {
    suspectMusic.play();
    suspectMusic.setVolume(0.5);
  }

  // User predicts the murderer
  background(0);

  // On screen etxt
  drawWords(
    "The evidence has been gathered - ",
    width / 2,
    80,
    40,
    CENTER,
    255,
    255,
    255
  );

  drawWords(
    "Choose who you think the murderer is!",
    width / 2,
    height - 120,
    40,
    CENTER,
    255,
    255,
    255
  );

  noTint();

  // Suspect 1
  drawWords(
    "Suspect 1: Riya Kanani",
    width / 4,
    height / 4 - 10,
    30,
    CENTER,
    255,
    0,
    0
  );
  image(riyaMugshot, width / 4 - imgWidth / 2, height / 4, imgWidth, imgHeight);
  let textHeight = height / 4 - imgHeight;

  // Suspect 2
  drawWords(
    "Suspect 2: Danika Perez",
    3 * (width / 4),
    height / 4 - 10,
    30,
    CENTER,
    255,
    0,
    0
  );

  image(
    danikaMugshot,
    3 * (width / 4) - imgWidth / 2,
    height / 4,
    imgWidth,
    imgHeight
  );
  textHeight = height / 4 - imgHeight;

  // Previous button
  prevButton();
}

// Stores the user's prediction based off where they click
function predictionClick() {
  // Parameters for clicking image
  if (
    mouseX > riyaX &&
    mouseX < riyaX + imgWidth &&
    mouseY > riyaY &&
    mouseY < riyaY + imgHeight
  ) {
    // User predicts riya
    prediction = 0;
    screen = 10;
    suspectMusic.stop();
  } else if (
    mouseX > danikaX &&
    mouseX < danikaX + imgWidth &&
    mouseY > danikaY &&
    mouseY < danikaY + imgHeight
  ) {
    // User predicts Danika
    prediction = 1;
    screen = 10;
    suspectMusic.stop();
  }
}

// Results screen
function resultScreen() {
  // Adds background
  evidenceScreensBackground();

  // Changes text
  textHeight = 75;

  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(50);
  textAlign(CENTER);
  text("THE MURDER IS...", width / 2, textHeight);

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.5) * 100) - 40;
  textSize(50);
  textAlign(CENTER);
  text("THE MURDER IS....", width / 2, (textHeight += 20));

  // Text fades
  fill(255, 0, 0, 100 + sin(frameCount * 0.05) * 100);
  textSize(50);
  textAlign(CENTER);
  text("THE MURDER IS...", width / 2, (textHeight += 20));

  // Adds next screen button
  nextButton();

  textHeight = 100;

  // Murderer image
  if (rand == 0) {
    // Draws riya's image
    drawWords(
      "Suspect 1: Riya Kanani",
      width / 2,
      textHeight + imgHeight + 100,
      30,
      CENTER,
      255,
      0,
      0
    );
    image(
      riyaMugshot,
      width / 2 - imgWidth / 2,
      height / 4,
      imgWidth,
      imgHeight
    );
    textHeight = height - 100;
  } else if (rand == 1) {
    // Draws danika's image
    drawWords(
      "Suspect 2: Danika Perez",
      width / 2,
      textHeight + imgHeight + 100,
      30,
      CENTER,
      255,
      0,
      0
    );

    image(
      danikaMugshot,
      width / 2 - imgWidth / 2,
      height / 4,
      imgWidth,
      imgHeight
    );
    textHeight = height - 100;
  }

  // Prints whether or not user was correct
  if (rand == prediction) {
    // Correct
    if (!winSound.isPlaying() && winPlayed == 0) {
      winSound.play();
      winPlayed = 1;
    }
    drawWords(
      "You found the murderer!",
      width / 2,
      textHeight,
      30,
      CENTER,
      255,
      255,
      255
    );

    textHeight = height - 20;
  } else {
    // If user is Wrong
    if (!loseSound.isPlaying() && losePlayed == 0) {
      loseSound.play();
      losePlayed = 1;
    }
    drawWords(
      "You were wrong!",
      width / 2,
      textHeight,
      30,
      CENTER,
      255,
      255,
      255
    );

    textHeight = height - 20;
  }

  // Play Again
  fill(255);
  strokeWeight(5);
  stroke(255, 0, 0);
  fill("white");
  rect(width - 30 - 200, height - 60 - 10, 200, 40, 20);
  noStroke();
  fill("black");
  textSize(20);
  text("PLAY AGAIN", width - 145, height - 42);
  triangle(
    width - 40,
    height - 60 - 10 + 20,
    width - 60,
    height - 60 - 10 + 10,
    width - 60,
    height - 60 - 10 + 30
  );
}

// Method 1: More flexible, any order
// Flexible reason for clicking back and forth between screen
function mouseClicked() {
  if (screen == 0) {
    // home screen
    iRememberClifford.stop();
    screen = 1;
  } else if (screen == 1) {
    // murderer screen
    if (checkNext()) {
      dunPlayed = 0;
      dunDunDunnn.stop();
      screen = 2;
    } else if (checkPrev()) {
      dunPlayed = 0;
      dunDunDunnn.stop();
      screen = 0;
    }
  } else if (screen == 2) {
    // suspect screen
    if (checkNext()) {
      suspectMusic.stop();
      screen = 3;
    } else if (checkPrev()) {
      screen = 1;
    }
  } else if (screen == 3) {
    // clicker game screen
    targetWeapon.clicked();
  } else if (screen == 4) {
    // evidence screen
    if (checkNext()) {
      screen = 5;
    }
  } else if (screen == 5) {
    doorGameNextScreen();
  } else if (screen == 6) {
    // evidence screen
    if (checkNext()) {
      screen = 7;
    }
  } else if (screen == 7) {
    // keys game screen
    if (checkNext() && foundNumber == true) {
      screen = 8;
    }
  } else if (screen == 8) {
    // evidence screen
    if (checkNext()) {
      gameMusic.stop();
      screen = 9;
    }
  } else if (screen == 9) {
    // choose suspect screen
    if (checkPrev()) {
      screen = 8;
    }
    predictionClick();
  } else if (screen == 10) {
    // result screen
    if (checkNext()) {
      screen = 0;
      resetGame();
    }
  }
}

// Checks to see if its a button to move onto next screen
function checkNext() {
  if (
    mouseX > nextButtonX &&
    mouseX < nextButtonX + nextButtonWidth &&
    mouseY > nextButtonY &&
    mouseY < nextButtonY + nextButtonHeight
  ) {
    return true;
  }
  return false;
}

// Checks to see if its a button to move onto previous screen
function checkPrev() {
  if (
    mouseX > prevButtonX &&
    mouseX < prevButtonX + prevButtonWidth &&
    mouseY > prevButtonY &&
    mouseY < prevButtonY + prevButtonHeight
  ) {
    return true;
  }
  return false;
}

// Door game screen
function doorGameNextScreen() {
  // Checks to see if click is on door
  if (
    mouseX > door1ButtonX &&
    mouseX < door1ButtonX + door1ButtonWidth &&
    mouseY > door1ButtonY &&
    mouseY < door1ButtonY + door1ButtonHeight
  ) {
    // Checks to see if door is open
    if (openDoor == 1) {
      openDoor = 0;
    } else {
      openDoor = 1;
    }

    // Checks to see if click is on door
  } else if (
    mouseX > door2ButtonX &&
    mouseX < door2ButtonX + door2ButtonWidth &&
    mouseY > door2ButtonY &&
    mouseY < door2ButtonY + door2ButtonHeight
  ) {
    // Checks to see if door is open
    if (openDoor == 2) {
      openDoor = 0;
    } else {
      openDoor = 2;
    }

    // Checks to see if click is on door
  } else if (
    mouseX > door3ButtonX &&
    mouseX < door3ButtonX + door3ButtonWidth &&
    mouseY > door3ButtonY &&
    mouseY < door3ButtonY + door3ButtonHeight
  ) {
    // Checks to see if door is open
    if (openDoor == 3) {
      openDoor = 0;
    } else {
      openDoor = 3;
    }

    // Checks to see if click is on door
  } else if (
    mouseX > door4ButtonX &&
    mouseX < door4ButtonX + door4ButtonWidth &&
    mouseY > door4ButtonY &&
    mouseY < door4ButtonY + door4ButtonHeight
  ) {
    // Checks to see if door is open
    if (openDoor == 4) {
      openDoor = 0;
    } else {
      openDoor = 4;
    }

    // Checks to see if click is on door
  } else if (
    mouseX > nextButtonX &&
    mouseX < nextButtonX + nextButtonWidth &&
    mouseY > nextButtonY &&
    mouseY < nextButtonY + nextButtonHeight
  ) {
    // Can move onto next screen if random door is found
    if (
      (openDoor == 1 && randDoor == 0) ||
      (openDoor == 2 && randDoor == 1) ||
      (openDoor == 3 && randDoor == 2) ||
      (openDoor == 4 && randDoor == 3)
    ) {
      screen = 6;
    }
    openDoor = 0;
  } else {
    openDoor = 0;
  }
}

// Creates next button
function nextButton() {
  strokeWeight(5);
  stroke(255, 0, 0);
  fill("white");
  rect(nextButtonX, nextButtonY, nextButtonWidth, nextButtonHeight, 20);
  noStroke();
  fill("black");
  textSize(20);
  text("NEXT", width - 100, height - 42);
  triangle(
    width - 40,
    height - 60 - 10 + 20,
    width - 60,
    height - 60 - 10 + 10,
    width - 60,
    height - 60 - 10 + 30
  );
}

// Creates previous button
function prevButton() {
  strokeWeight(5);
  stroke(255, 0, 0);
  fill("white");
  rect(30, height - 60 - 10, 120, 40, 20);
  noStroke();
  textSize(20);
  fill("black");
  text("BACK", 100, height - 42);
  triangle(
    40,
    height - 60 - 10 + 20,
    60,
    height - 60 - 10 + 10,
    60,
    height - 60 - 10 + 30
  );
}

// Function resets game, function and random variables
function resetGame() {
  rand = int(random() * 2);
  firstLoopWeapon = 1;
  dunPlayed = 0;
  keysValue = 5;
  randDoor = int(random() * 4);
  winPlayed = 0;
  losePlayed = 0;

  if (rand == 0) {
    object = "knife";
    faveColor = "red";
    number = 20;
  } else {
    object = "bat";
    faveColor = "blue";
    number = 13;
  }
}

// Draws the words on screen
function drawWords(word, x, y, fontSize, alignment, r, g, b, t) {
  textSize(fontSize);
  fill(r, g, b, t);
  textAlign(alignment);
  text(word, x, y);
}

// Background for home screen
function startScreenBackground() {
  background(0);
  image(startBackground, 10, 400);
  image(startBackground, 650, 200);
  image(startBackground, -40, 0);
}

// Background for murderer screen
function murdererScreenBackground() {
  background(0);
  image(startBackground, 10, 400);
  image(startBackground, 70, 200);
  image(startBackground, -40, 0);
}

// Background for home screen
function suspectScreenBackground() {
  background(0);

  // Columns are for bars on screen
  col1++;
  col2++;
  col3++;
  col4++;
  col5++;
  col6++;
  col7++;
  col8++;
  col9++;
  col0++;

  // Allows Columns to move side to side
  if (col0 > width) {
    col0 = -100;
  }

  if (col1 > width) {
    col1 = -100;
  }

  if (col2 > width) {
    col2 = -100;
  }
  if (col3 > width) {
    col3 = -100;
  }
  if (col4 > width) {
    col4 = -100;
  }
  if (col5 > width) {
    col5 = -100;
  }
  if (col6 > width) {
    col6 = -100;
  }
  if (col7 > width) {
    col7 = -100;
  }
  if (col8 > width) {
    col8 = -100;
  }
  if (col9 > width) {
    col9 = -100;
  }

  // Fills the rect a random shade of gray
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col0, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col1, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col2, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col3, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col4, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col5, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col6, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col7, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col8, 0, 30, 600);
  fill(random(130, 170), random(130, 170), random(130, 170), 60);
  rect(col9, 0, 30, 600);
}

// Game screen background
function gameScreenBackground() {
  background(0);
  tint(255, 255);
  image(startBackground, 10, 400);
  image(startBackground, 650, 200);
  image(startBackground, -40, 0);
}

// Evidence screen background
function evidenceScreensBackground() {
  background(0);

  image(startBackground, 10, 400);
  image(startBackground, 650, 200);
  image(startBackground, -40, 0);

  // Magnifying glass made
  fill(100, 100, 100);
  ellipse(56, 46, 55, 55);
  fill(255, 255, 255, 200);
  ellipse(54, 50, 56, 56);
  fill(100, 100, 100);
  angleMode(RADIANS);
  rotate(70);
  rect(100, -15, 60, 10, 50);
  rotate(-70);
}
