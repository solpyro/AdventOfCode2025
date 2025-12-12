const { fetchInput } = require('./fetchInput.js');

function parseInput(input) {
    // Parse input into ranges and values
    const sections = input.trim().split('\n\n');
    const freshRanges = sections[0].split('\n').map(line => {  
        const [start, end] = line.split('-').map(Number);
        return { start, end };
    });
    const ingredients = sections[1].split('\n').map(Number);
    return { freshRanges, ingredients };
}

const getFreshIngredients = (freshRanges, ingredients) =>
    ingredients.filter(ingredient => freshRanges.some(range => ingredient >= range.start && ingredient <= range.end));

function collapseRanges(ranges) {
    if (ranges.length === 0) return [];
    ranges.sort((a, b) => a.start - b.start);
    const collapsed = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
        let last = collapsed[collapsed.length - 1];
        let current = ranges[i];
        if (current.start <= last.end) {
            last.end = Math.max(last.end, current.end);
        } else {
            collapsed.push(current);
        }
    }
    return collapsed;
}

function run(input) {
    let { freshRanges, ingredients } = parseInput(input);

    // Part 1
    console.log(`Fresh ingredients count: ${getFreshIngredients(freshRanges, ingredients).length}`);

    // Part 2
    console.log(`Total unique fresh ingredients count: ${collapseRanges(freshRanges).map(range => range.end - range.start + 1).reduce((a, b) => a + b, 0)}`);
}

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

run(testInput);

fetchInput(5, (input) => {
    run(input);
});