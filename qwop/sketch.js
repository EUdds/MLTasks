var Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

let engine;
let world;
let leftFoot, rightFoot, leftLeg, rightLeg, torso;
let ground;
let particle;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  ground = new Boundry(width / 2, height, width*20, 10, 0);
  leftFoot = new Box(20, height - 10, 20, 10);
  rightFoot = new Box(25, height- 10, 20 , 10);

}

function draw() {
  background(51);
  Engine.update(engine);
  ground.show();
  leftFoot.show();
  rightFoot.show();
  
  stroke(255);
  fill(0);
  rectMode(CENTER);
}

// function mousePressed () {
//     shapes.push(new Circle(mouseX, mouseY, 20));
// }
