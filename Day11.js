const path = require("path");

function parseInput(input) {
    const lines = input.trim().split('\n').map(line => line.trim());
    const nodes = lines.map(line => {
        const [namePart, childrenPart] = line.split(':');
        const name = namePart.trim();
        const children = childrenPart ? childrenPart.trim().split(' ').map(child => child.trim()) : [];
        return { name, children };
    });
    return nodes;
}

function findAllPaths(nodes, startName, endName, visited = new Set()) {
    if (startName === endName) {
        return [[endName]];
    }
    visited.add(startName);
    const paths = [];
    const startNode = nodes.find(node => node.name === startName);
    for (const childName of startNode.children) {
        if (!visited.has(childName)) {
            const childPaths = findAllPaths(nodes, childName, endName, new Set(visited));
            for (const path of childPaths) {
                paths.push([startName, ...path]);
            }
        }
    }
    return paths;
}

function part1(nodes) {
    const paths = findAllPaths(nodes, 'you', 'out');
    console.log("Total paths from 'you' to 'out':", paths.length);
}

function part2(nodes) {
    // Possible strategy is to find paths from `svr` to `fft` or `dac` and then from those to `out`, to reduce the stack depth.
    // This requires changes to `findAllPaths` to gracefully handle encounters with `out` nodes since they have no children.
    // const paths = findAllPaths(nodes, 'svr', 'fft');
    // console.log("Total paths from 'svr' to 'fft':", paths.length);

    const paths = findAllPaths(nodes, 'svr', 'out');
    console.log("Total paths from 'svr' to 'out' that pass through 'dac' & 'fft':", paths.filter(path => path.includes('dac') && path.includes('fft')).length);
}

const testData = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;
const testNodes = parseInput(testData);
part1(testNodes);

const testData2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;
const testNodes2 = parseInput(testData2);
part2(testNodes2);

const input = ``;
// const nodes = parseInput(input);
// part1(nodes);
// part2(nodes);