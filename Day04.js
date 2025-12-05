function parseInput(input) {
    return input.split('\n').filter(line => line.trim() !== '')
    .map(line => line.split('').map(char => char === '@' ? 1 : 0));
}

function countNeighbours(room, x, y) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], 
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    let count = 0;
    for (let [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;   
        if (ny >= 0 && ny < room.length && nx >= 0 && nx < room[ny].length) {
            count += room[ny][nx];
        }
    }
    return count;
}
function countAllNeighbours(room) {
    let neighbourCounts = room.map(row => row.map(() => null));
    for(let y = 0; y < room.length; y++) {
        for(let x = 0; x < room[y].length; x++) {
            if(room[y][x] === 1) { // Only count neighbors for occupied seats
                neighbourCounts[y][x] = countNeighbours(room, x, y);
            }
        }
    }
    return neighbourCounts;
}

let countAccessibleNeighbours = (neighbourCounts) => neighbourCounts.map((row) => row.filter(cell => cell!== null && cell <= 3).length)
        .reduce((a,b) => a + b, 0);

function run(input) {
    let room = parseInput(input);

    // Part 1: Count accessible rolls
    let neighbourCounts = countAllNeighbours(room);
    let neighbourWith3OrFewer = countAccessibleNeighbours(neighbourCounts);      
    console.log(`Rolls with 3 or fewer neighbours: ${neighbourWith3OrFewer}`);

    // Part 2: Remove accessible rolls
    let removedNeighbours = 0;
    while(neighbourWith3OrFewer > 0) {
        removedNeighbours += neighbourWith3OrFewer;

        // Remove accessible rolls
        for(let y = 0; y < room.length; y++)
            for(let x = 0; x < room[y].length; x++)
                if(neighbourCounts[y][x] !== null && neighbourCounts[y][x] <= 3)
                    room[y][x] = 0; // Remove roll

        // Recalculate neighbours
        neighbourCounts = countAllNeighbours(room);
        neighbourWith3OrFewer = countAccessibleNeighbours(neighbourCounts);
    }
    console.log(`Total rolls removed: ${removedNeighbours}`);
}

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
run(testInput);