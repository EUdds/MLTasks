const POP_TOTAL = 500;
let birds = [];
let pipes = [];
let savedBirds = [];
let counter = 0;
let gameScore = 0;
let generationScore = 1;
let bestScore = 0;

let bgSrc = "images/bg.png";
let bgImg;

function setup() {
  createCanvas(400, 600);
  bgImg = loadImage(bgSrc);
  for (let i = 0; i < POP_TOTAL; i++) {
    birds[i] = new Bird();
    birds[i].init();
  }
  scoreLabel = createElement('h1', 'Score: 0');
  highScoreLabel = createElement('h1', 'High Score: 0');
  generationLabel = createElement('h1', 'Generation 1');
  birdsLabel = createElement('h1');
  saveButton = createButton("Save");
  saveButton.mousePressed(saveBird);
}

function draw() {
  background(bgImg);
  if (counter % 75 == 0) {
    addNewPipe();
  }
  counter ++;

  scoreLabel.html(`Score: ${gameScore}`, false);
  highScoreLabel.html(`High Score: ${bestScore}`);
  generationLabel.html(`Generation: ${generationScore}`, false);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j--) {
      if (pipes[i].hits(birds[j])) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      gameScore++;
      if(gameScore > bestScore) bestScore = gameScore;
    }
  }
  birds.forEach(bird => {
    bird.think(pipes);
    bird.update();
    bird.show();
  });

  if (birds.length === 0) {
    counter = 0;
    if(gameScore > bestScore) bestScore = gameScore;
    gameScore = 0;
    pipes = [];
    nextGeneration();
    generationScore++;
  }

  for (let i = 0; i < birds.length; i++) {
    if (birds[i].offScreen()) {
      savedBirds.push(birds.splice(i,1)[0]);
    }
  }
}

function addNewPipe() {
  let newPipe = new Pipe();
  pipes.push(newPipe);
  newPipe.init();
}


function saveBird() {
  let bird = birds[0];
  saveJSON(bird.brain, 'bird.json');
}
