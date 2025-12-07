function parseInput(input) {
    return input.trim().split('\n');
}

function run(input) {
    let lines = parseInput(input);
    let entryPoints = [lines[0].indexOf('S')];
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

    console.log("Total splits:", splitCount);
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