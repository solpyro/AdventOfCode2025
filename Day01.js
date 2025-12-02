

function parseInput(input) {
    return input.split('\n').map(line => line.substring(1)*(line[0] === 'L' ? -1 : 1));
}

function calculateStopsAtN(movements) {
    let stops = 0;
    let position = 50;

    for (let move of movements) {
        position += move;

        while(position < 0) position += 100;
        while(position > 99) position -= 100;

        if (position === 0) stops++;
    }

    return stops;
}

function calculatePassesN(movements) {
    let passes = 0;
    let position = 50;

    for (let move of movements) {
        var dir = Math.sign(move);
        move = Math.abs(move);

        while(move > 0) {
            position += dir;
            move--;

            if(position === -1) position = 99;
            if(position === 100) position = 0;

            if(position === 0) passes++;
        }
    }

    return passes;
}

function run(input) {
    var parsedInput = parseInput(input);

    console.log(`Stops at Zero ${calculateStopsAtN(parsedInput)} times`);
    console.log(`Passes Zero ${calculatePassesN(parsedInput)} times`);
}

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
run(testInput);