const LEN = 784;
let trains = new Classification("TRAIN");
let axes = new Classification("AXE");
let fish = new Classification("FISH");
let angels = new Classification("ANGEL")

let nn;


function preload(){
  for (let n =0; n < classifiers.length; n++) {
    classifiers[n].raw = loadNPZFile(`${classifiers[n].name.toLowerCase()}`)
  }
}
function setup() {
  createCanvas(280, 280);
  background(255);
  
  prepAllData(classifiers);

  nn = new NeuralNetwork(784, 64, numberOfObjects);

  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(() => {
    trainEpoch();
    epochCounter++
    console.log(`Epoch: ${epochCounter}`);
  });
  let testButton = select('#test');
  testButton.mousePressed(() => {
    let pct = testAll();
    console.log(`Tested Epoch ${epochCounter} with ${pct}% accuracy`);

  });
  let classText = select('#classification');
  let guessButton = select('#guess');
  guessButton.mousePressed(() => {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i=0; i< LEN; i ++) {
      let val = img.pixels[i*4];
      inputs[i] = (255 - val)/255.0;
    }
    let guess = nn.predict(inputs);
    let classification = guess.indexOf(max(guess));
    let className = classifiers[classification].name;
    classText.innerHTML = `It is a ${className}`;
    console.log(`It is a ${className}!`);
  });

  let clearButton = select('#clear');
  clearButton.mousePressed(() => {
    background(255);
  });

  let saveButton = select('#save');
  saveButton.mousePressed(() => {
    let string = nn.serialize();
    saveJSON(nn, "nn.json");
  })

}

function draw() {
  strokeWeight(10);
  stroke(0);
  if(mouseIsPressed) line(pmouseX, pmouseY, mouseX, mouseY);
}
