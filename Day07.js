const { fetchInput } = require('./fetchInput.js');

function parseInput(input) {
    return input.trim().split('\n');
}

function part1(lines, entryPoints) {
    splitCount = 0;

    for (let row = 1; row < lines.length; row++) {
        let newEntryPoints = [];

        for (let col of entryPoints) {
            if (lines[row][col] === '^') {
                splitCount++;
                if (col > 0) newEntryPoints.push(col - 1);
                if (col < lines[row].length - 1) newEntryPoints.push(col + 1);
            } else {
                newEntryPoints.push(col);
            }
        }

        entryPoints = [...new Set(newEntryPoints)];
    }

    return splitCount;
}

function part2(lines, entryPoints) {
    for (let row = 1; row < lines.length; row++) {
        let newEntryPoints = [];

        for (let col of entryPoints) {
            if (lines[row][col] === '^') {
                splitCount++;
                if (col > 0) newEntryPoints.push(col - 1);
                if (col < lines[row].length - 1) newEntryPoints.push(col + 1);
            } else {
                newEntryPoints.push(col);
            }
        }

        entryPoints = newEntryPoints;
    }

    return entryPoints.length;
}

function run(input) {
    let lines = parseInput(input);
    let entryPoints = [lines[0].indexOf('S')];
    

    console.log("Total splits:", part1(lines, entryPoints));
    console.log("Total timelines:", part2(lines, entryPoints));
}

const testData = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
run(testData);

fetchInput(7, (input) => {
    run(input);
});