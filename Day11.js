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

function run(input) {
    const nodes = parseInput(input);

    const paths = findAllPaths(nodes, 'you', 'out');
    console.log("Total paths from 'you' to 'out':", paths.length);
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
run(testData);