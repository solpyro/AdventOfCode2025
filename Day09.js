const parseInput = (input) => input.trim().split('\n').map(line => line.split(',').map(Number)).map(([x, y]) => ({x, y}));

function makeSquares(points) {
    const squares = [];
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        for(let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const square = {
                p1, p2, 
                 area: (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1)
            };
            squares.push(square);
        }   
    }
    return squares;
}

function run(input) {
    const points = parseInput(input);
    const squares = makeSquares(points).sort((a, b) => b.area - a.area);

    console.log("Largest square area:", squares[0].area);
    console.log("Corners:", JSON.stringify(squares[0].p1), JSON.stringify(squares[0].p2));
}

let testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
run(testInput);