const POP_TOTAL = 250;
let birds = [];
let pipes = [];
let savedBirds = [];
let counter = 0;
let gameScore = 0;

let bgSrc = "images/bg.png";
let bgImg;

function setup() {
  createCanvas(400, 600);
  bgImg = loadImage(bgSrc);
  for (let i = 0; i < POP_TOTAL; i++) {
    birds[i] = new Bird();
    birds[i].init();
  }
  scoreLabel = createElement('h1', 'Score: 0')
}

function draw() {
  background(bgImg);
  if (counter % 75 == 0) {
    addNewPipe();
  }
  counter ++;

  scoreLabel.html(`Score : ${gameScore}`, false);

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
    }
  }
  birds.forEach(bird => {
    bird.think(pipes);
    bird.update();
    bird.show();
  });

  if (birds.length === 0) {
    counter = 0;
    gameScore = 0;
    pipes = [];
    nextGeneration();
  }
}
// function keyPressed() {
//     if (key == ' ') {
//         bird.up();
//     }
// }

function addNewPipe() {
  let newPipe = new Pipe();
  pipes.push(newPipe);
  newPipe.init();
}
