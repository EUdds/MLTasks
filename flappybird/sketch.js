let bird;
let pipes = [];

let bgSrc = 'images/bg.png'
let bgImg;

function setup() {
    createCanvas(400, 600);
    bgImg = loadImage(bgSrc);
    bird = new Bird();
    bird.init();
    addNewPipe();
}

function draw() {
    background(bgImg);

    for( let i = pipes.length-1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if(pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }

        if(pipes[i].hits(bird)) {
            console.log('AHHHHHHHHH')
        }
    }

    bird.update();
    bird.show();

    if ((frameCount % 75) == 0) {
        addNewPipe();
    }
}
    function keyPressed() {
        if (key == ' ') {
            bird.up();
        }
    }

function addNewPipe() {
    let newPipe = new Pipe();
    pipes.push(newPipe);
    newPipe.init();    
}
