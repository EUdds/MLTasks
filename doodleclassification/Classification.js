let numberOfObjects = 0;
let classifiers = [];
function Classification(name, raw, testing, training) {
  let self = this;
  this.id = numberOfObjects;
  classifiers[this.id] = this;
  numberOfObjects++;
  this.name;
  this.raw;
  this.testing;
  this.training;
  this.numImages;
  if (name) {
    this.name = name;
  }
  if (raw) {
    this.raw = raw
  }
  if (testing) {
    this.testing = testing;
  }
  if (training) {
    this.training = training;
  }

  this.fixBytes = () => {
    this.raw = this.raw.bytes;
    this.numImages = (this.raw.length - 80) / LEN;
  }

   function createBitmapImage(offset){
     if (!offset) offset = 0;
    let start = 80 + (784 * offset);
    let img = createImage(28, 28);
    img.loadPixels();
    for (let i=0; i < LEN; i++) {
      let index = i + start;
      let val = 255 - self.raw[index];
      img.pixels[i * 4 + 0] = val; // It looks nice lmao
      img.pixels[i * 4 + 1] = val;
      img.pixels[i * 4 + 2] = val;
      img.pixels[i * 4 + 3] = 255;

    }
    img.updatePixels();
    return img;
  }

  this.showImage = (x, y, imgNum) => {
    if (!imgNum) imgNum = 0;
    image(createBitmapImage(imgNum), x, y);
  }
}
