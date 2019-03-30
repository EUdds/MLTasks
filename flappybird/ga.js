function nextGeneration() {

    calculateFitness();

    for (let i=0; i < POP_TOTAL; i++) {
        birds[i] = pickOne();
    }
    savedBirds = [];
    console.info('Next Generation');
}

function calculateFitness() {
    let sum = 0;
    for (let bird of savedBirds) {
        sum += bird.score;
    }
    for (let bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;
    let bird = savedBirds[index];
    console.log(`Best Bird had a score of  ${bird.score} and a fitness of ${bird.fitness}`);
    let child = new Bird(bird.brain);
    child.init();
    child.mutate(0.1);
    return child;
}
