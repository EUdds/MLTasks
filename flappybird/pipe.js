function Pipe() {
  this.spacing = 175;
  this.top = random(height / 6, (3 / 4) * height);
  this.bottom = height - (this.top + this.spacing);
  this.width = 80;
  this.x = width;
  this.speed = 6;

  this.highlight = false;

  this.topSrc = "images/pipeNorth.png";
  this.botSrc = "images/pipeSouth.png";
  this.topImg;
  this.botImg;

  this.init = () => {
    this.topImg = loadImage(this.topSrc);
    this.botImg = loadImage(this.botSrc);
  };

  this.hits = bird => {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.width) {
        this.highlight = true;
        return true;
      }
      this.highlight = false;
    }
    this.highlight = false;
  };

  this.show = () => {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    image(this.topImg, this.x, 0, this.width, this.top);
    image(this.botImg, this.x, height - this.bottom, this.width, this.bottom);
  };

  this.update = () => {
    this.x -= this.speed;
  };

  this.offscreen = () => {
    return this.x < -this.width;
  };
}
