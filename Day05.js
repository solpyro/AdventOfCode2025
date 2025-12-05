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


function run(input) {
    let { freshRanges, ingredients } = parseInput(input);

    // Part 1
    console.log(`Fresh ingredients count: ${getFreshIngredients(freshRanges, ingredients).length}`);
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