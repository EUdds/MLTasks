const POP_TOTAL = 500;

let bird;
let pipes = [];

let gameScore = 0;
let counter = 0;

let bgSrc = "images/bg.png";
let bgImg;
let brainJSON;

function preload() {
  brainJSON = loadJSON('bird.json');
}

function setup() {
  createCanvas(400, 600);
  bgImg = loadImage(bgSrc);
  birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
  bird.init();

  // UI Elements
  scoreLabel = createElement('h1', 'Score: 0');
  birdsLabel = createElement('h1');
}

function draw() {
  background(bgImg);
  if (counter % 75 == 0) {
    addNewPipe();
  }
  counter ++;

  scoreLabel.html(`Score: ${gameScore}`, false);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.error('Collision');
      }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      gameScore++;
    }
  }
   
    bird.think(pipes);
    bird.update();
    bird.show();


    if (bird.offScreen()) {
      console.error('Bottom');
    }

}

function addNewPipe() {
  let newPipe = new Pipe();
  pipes.push(newPipe);
  newPipe.init();
}
