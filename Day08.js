const { fetchInput } = require('./fetchInput.js');

let calculateSquaredDistance = (pointA, pointB) => (pointA.x - pointB.x)**2 + (pointA.y - pointB.y)**2 + (pointA.z - pointB.z)**2;

function parseInput(input) {
    let lines = input.trim().split('\n');
    let points = lines.map(line => line.split(',').map(Number))
        .map(coords => ({ x: coords[0], y: coords[1], z: coords[2] }));

    let distanceBetweenPoints = [];
    for(let i=0; i<points.length-1; i++)
        for(let j=i+1; j<points.length; j++)
            distanceBetweenPoints.push({point1: points[i], point2: points[j], dist: calculateSquaredDistance(points[i], points[j])});
    return distanceBetweenPoints.sort((a, b) => a.dist - b.dist);
}

function connectNClosestPoints(connections, distanceBetweenPoints) {
    let circuits = [];
    
    for(let i=0; i<connections; i++) {
        newConnection = distanceBetweenPoints[i];
        
        if(circuits.some(circuit => circuit.includes(newConnection.point1) || circuit.includes(newConnection.point2))) {
            if(circuits.some(circuit => circuit.includes(newConnection.point1) && circuit.includes(newConnection.point2)))
                continue;
            if(circuits.some(circuit => circuit.includes(newConnection.point1)) && circuits.some(circuit => circuit.includes(newConnection.point2))) {
                let circuit1Index = circuits.findIndex(circuit => circuit.includes(newConnection.point1));
                let circuit2Index = circuits.findIndex(circuit => circuit.includes(newConnection.point2));
                circuits[circuit1Index] = circuits[circuit1Index].concat(circuits[circuit2Index]);
                circuits.splice(circuit2Index, 1);
            } else {
                for(let circuit of circuits) {
                    if(circuit.includes(newConnection.point1)) {
                        circuit.push(newConnection.point2);
                        break;
                    }
                    if(circuit.includes(newConnection.point2)) {
                        circuit.push(newConnection.point1);
                        break;
                    }
                }
            }
        } else {
            circuits.push([newConnection.point1, newConnection.point2]);
        }
    }

    return circuits;
}

function run(input, connections) {
    let distanceBetweenPoints = parseInput(input);
    
    let circuits = connectNClosestPoints(connections, distanceBetweenPoints);

    let multipliedSizeOfTop3 = circuits.sort((a, b) => b.length - a.length).slice(0, 3).reduce((a,b) => a*b.length, 1);
    console.log(`Part 1: ${multipliedSizeOfTop3}`); 
}

const testInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;
run(testInput, 10);

fetchInput(8, (input) => {
    run(input);
});