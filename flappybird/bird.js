function Bird(brain) {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.7;
  this.velocity = 0;
  this.lift = 12;

  this.src = "images/bird.png";
  this.img;

  if (brain) {
    this.brain = brain.copy();
  } else {
    this.brain = new NeuralNetwork(4, 4, 2);
  }

  this.score = 0;
  this.fitness = 0;

  this.init = () => {
    this.img = loadImage(this.src);
  };

  this.show = () => {
    // fill(255);
    // ellipse(this.x, this.y, 32, 32);
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  };

  this.think = pipes => {
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = pipes[0].top / height;
    inputs[2] = pipes[0].bottom / height;
    inputs[3] = pipes[0].x / width;
    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.up();
    }
  };

  this.update = () => {
    this.score++;

    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.9;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };

  this.up = () => {
    this.velocity -= this.lift;
  };

  this.mutate = () => {
    this.brain.mutate(0.1);
  };
}
