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
    bestFitness = 0;
    for (let bird of savedBirds) {
        sum += bird.score;
    }
    for (let bird of savedBirds) {
        bird.fitness = bird.score / sum;
        if (bird.fitness > bestFitness) {
            bestFitness = bird.fitness;
        } 
    }
    console.log(`Best Bird had a score of  ${Number(bestFitness * sum).toFixed(0)} and a fitness of ${bestFitness}`);
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
    let child = new Bird(bird.brain);
    child.init();
    child.mutate(0.1);
    return child;
}
