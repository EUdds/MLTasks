function trainOne(image, label) {
  let inputs = [];
  image.resize(28, 28);
  image.loadPixels();
  for (let i=0; i< LEN; i ++) {
    let val = image.pixels[i*4];
    inputs[i] = (255 - val)/255.0;
  }
  let targets = [];
    for (let n = 0; n < classifiers.length; n++) {
      targets[n] = 0;
    }
    targets[label] = 1;
    nn.train(inputs, targets);
    console.log("Trained");
}

function trainEpoch() {
  let training = createTrainingArray(classifiers);
  for (let i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = Array.from(data).map(x => x / 255);
    // console.log(inputs);
    let label = training[i].label;
    let targets = []; // Empty array, fill with num of classifiers
    for (let n = 0; n < classifiers.length; n++) {
      targets[n] = 0;
    }
    targets[label] = 1;
    nn.train(inputs, targets);
  }
}

function createTrainingArray(list) {
  let training = [];
  for (i = 0; i < list.length; i++) {
    training = training.concat(list[i].training);
  }
  training = shuffle(training);
  return training;
}

function createTestingArray(list) {
  let testing = [];
  for (i = 0; i < list.length; i++) {
    testing = testing.concat(list[i].testing);
  }
  testing = shuffle(testing);
  return testing;
}

function testAll() {
  let testing = createTestingArray(classifiers);
  let correctness = 0;
  for (let i = 0; i < testing.length; i++) {
    let data = testing[i];
    let inputs = Array.from(data).map(x => x / 255);
    // console.log(inputs);
    let label = testing[i].label;
    let guess = nn.predict(inputs);
    // console.log(guess);
    let classification = guess.indexOf(max(guess));
    // console.log(`Guess: ${classification} with ${max(guess).toFixed(2)*100}% certianty  Actual: ${label}`);

    if (classification === label) {
      correctness++;
    }
  }
  return (correctness / testing.length * 100).toFixed(2);
}
