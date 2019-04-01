this.fitnesses = [];
this.generations = [];
function Player() {
  this.brain = new NeuralNetwork(12, 5, 8);
  this.prevChoice = null;
 
  this.score = 0;
  this.fitness = 0;

  this.pressQ = () => {
    handleQPressed();
  };

  this.releaseQ = () => {
    handleQReleased();
  };

  this.pressW = () => {
    handleWPressed();
  };

  this.releaseW = () => {
    handleWReleased();
  };

  this.pressO = () => {
    handleOPressed();
  };

  this.releaseO = () => {
    handleOReleased();
  };

  this.pressP = () => {
    handlePPressed();
  };

  this.releaseP = () => {
    handlePReleased();
  };

  this.think = () => {
    let inputs = [];
    inputs[0] = body.head.m_angularVelocity;
    inputs[1] = body.head.m_xf.position.x;
    inputs[2] = body.head.m_xf.position.y;
    inputs[3] = body.torso.m_xf.position.x;
    inputs[4] = body.ll_leg.m_angularVelocity;
    inputs[5] = body.ll_leg.m_xf.position.x;
    inputs[6] = body.lr_leg.m_angularVelocity;
    inputs[7] = body.lr_leg.m_xf.position.x;
    inputs[8] = body.ul_leg.m_angularVelocity;
    inputs[9] = body.ul_leg.m_xf.position.x;
    inputs[10] = body.ur_leg.m_angularVelocity;
    inputs[11] = body.ur_leg.m_xf.position.x;
    let output = this.brain.predict(inputs);
    let choice = indexOfMax(output);
    console.log(choice);
    switch (choice) {
      case 0:
        this.pressQ();
        break;
      case 1:
        if (this.prevChoice !== 0 && this.prevChoice) {
          this.releaseQ();
        }
        break;
      case 2:
        this.pressW();
        break;
      case 3:
        if (this.prevChoice !== 2 && this.prevChoice) {
          this.releaseW();
        }
        break;
      case 4:
        this.pressO();
        break;
      case 5:
        if (this.prevChoice !== 4 && this.prevChoice) {
          this.releaseO();
        }
        break;
      case 6:
        this.pressP();
        break;
      case 7:
        if (this.prevChoice !== 6 && this.prevChoice) {
          this.releaseP();
        }
        break;
    }
    this.prevChoice = choice;
  };

  this.mutate = () => {
    this.brain.mutate(0.1);
  };

}

    function nextGeneration(player) {
      generations.push(player.brain);
      calculateFitness();
      let bestGeneration = indexOfMax(fitnesses);
      let child = new Player(generations[bestGeneration]);
      child.mutate(0.1);
      return child;
    }

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
}

  function calculateFitness() {
    let score = counter;
    let fitness = this.score / 100;
    fitnesses.push(this.fitness);
  }
