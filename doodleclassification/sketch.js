const LEN = 784;
let ants = new Classification("ANT");
let bicycles = new Classification("BICYCLE");
let clouds = new Classification("CLOUD");
let ears = new Classification("EAR");

let nn;


function preload(){
  for (let n =0; n < classifiers.length; n++) {
    classifiers[n].raw = loadNPYFile(`${classifiers[n].name.toLowerCase()}`)
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
    classText.html("Testing");
    let pct = testAll();
    classText.html(`Tested Epoch ${epochCounter} with ${pct}% accuracy`);

  });
  let classText = select('#classification');
  let guessButton = select('#guess');
  let listString = "";
  for (let n = 0; n < classifiers.length; n ++) {
    listString += classifiers[n].name;
    if (n != classifiers.length - 1) listString += ", ";
  }
  classText.html(`Can currently Recognize ${listString}`);

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
  });

  let loadButton = select('#load');
  loadButton.mousePressed(() => {
    document.getElementById('fileInput').click();
  });

  let loadDefaultButton = select('#loadDefault');
  loadDefaultButton.mousePressed(() => {
    loadJSON('nn.json', (json) => {
      nn = NeuralNetwork.deserialize(json);
      classText.html('Default Model Loaded');
    });
  });

  document.getElementById('fileInput').addEventListener('change', () => {
    let tmpPath = URL.createObjectURL(event.target.files[0]);
    console.log(tmpPath);
    loadJSON(tmpPath, (json) => {
      console.log(json);
      nn = NeuralNetwork.deserialize(json);
      classText.html('Brain Model Sucessfully Loaded');

    })
  });

}

function draw() {
  strokeWeight(10);
  stroke(0);
  if(mouseIsPressed) line(pmouseX, pmouseY, mouseX, mouseY);
}
