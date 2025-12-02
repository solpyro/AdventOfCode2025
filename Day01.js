var testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

function parseInput(input) {
    return input.split('\n').map(line => line.substring(1)*(line[0] === 'L' ? -1 : 1));
}

function calculateStopsAtZero(movements) {
    let stops = 0;
    let position = 50;

    for (let move of movements) {
        position += move;

        while (position < 0) position += 100;
        while (position > 99) position -= 100;

        if (position === 0) {
            stops++;
        }
    }

    return {stops, crosses};
}

console.log(calculateStopsAtZero(parseInput(testInput)));
