let data;
let vectors;

let pos;

function preload() {
  data = loadJSON('./xkcd.json');
}

function setup() {
  noCanvas();
  // pos = createVector(random(255), random(255), random(255));
  pos = createVector(0, 0, 255);
  console.log(data);
  vectors = processData(data);
  console.log(vectors);
  // console.log(findNearest(pos));

}

function draw() {
  let color = findNearest(pos);
  let div = createDiv(color);
  let v = vectors[color];
  div.style('color', `rgb(${v.x}, ${v.y}, ${v.z})`);
  let r = p5.Vector.random3D();
  r.mult(50);
  pos.add(r);
  pos.x = constrain(pos.x, 0, 255);
  pos.y = constrain(pos.y, 0, 255);
  pos.z = constrain(pos.z, 0, 255);
  frameRate(2);
}

function processData(data) {
  let vectors = {};
  let colors = data.colors;
  for (let i = 0; i < colors.length; i++) {
    let label = colors[i].color;
    let rgb = color(colors[i].hex);
    vectors[label] = createVector(red(rgb), green(rgb), blue(rgb));
  }
  return vectors;
}

function findNearest(v) {
  let colors = Object.keys(vectors);
  colors.sort((a,b) => {
    let d1 = distance(v, vectors[a]);
    let d2 = distance(v, vectors[b]);
    return d1 - d2;
  });
  return colors[0];
}

function distance(v1, v2) {
  return p5.Vector.dist(v1, v2);
}
