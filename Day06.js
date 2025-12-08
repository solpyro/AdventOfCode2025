function parseInput_part1(lines) {
    const numbers = lines.slice(0, -1).map(line =>  line.trim().split(/\s+/).map(Number));
    const operators = lines[lines.length - 1].trim().split(/\s+/);
    return {numbers, operators};
}

const solveColumns = (numbers, operators) => 
    operators.map((op, colIndex) => {
        switch (op) {
            case '+':
                return numbers.reduce((sum, row) => sum + row[colIndex], 0);
            case '*':
                return numbers.reduce((prod, row) => prod * row[colIndex], 1);
            default:
                throw new Error(`Unknown operator: ${op}`);
        }
    });

function part1(lines) {
    let {numbers, operators} = parseInput_part1(lines);
    let answers = solveColumns(numbers, operators);
    return answers.reduce((a, b) => a + b, 0);
}

////////////////////////////////////

function rotateNumbers(lines) {
    // Use the maximum line length to avoid undefined indices
    const cols = Math.max(...lines.map(l => l.length));
    const colLines = [];

    for (let col = 0; col < cols; col++) {
        let colStr = '';
        for (let row = 0; row < lines.length; row++) {
            // If a line is shorter than the column index, treat missing char as space
            colStr += (lines[row][col] || ' ');
        }
        // Trim trailing/leading spaces for the column string; leave empty string
        // for columns that are only whitespace so join will produce empty lines.
        colLines.push(colStr.trim());
    }

    // Join columns by single newline. Empty column entries will create
    // consecutive newlines in the result (i.e. blank lines).
    // Limit runs of blank lines to at most two newlines to keep separators
    // consistent.
    const joined = colLines.join('\n').replace(/\n{3,}/g, '\n\n');
    return joined.trim();
}

function solveProblems(rotatedNumbers, operators) {
    // Split into blocks separated by truly empty lines. For each block,
    // split into lines, trim them and ignore empty lines before converting
    // to numbers so that purely-blank columns don't produce NaNs.
    let parsedProblems = rotatedNumbers
        .split("\n\n")
        .map(block => block.split('\n').map(line => line.trim()).map(Number));

    // Return an array of answers corresponding to each operator.
    return operators.map((operator, i) => {
        switch (operator) {
            case '+':
                return parsedProblems[i].reduce((sum, n) => sum + n, 0);
            case '*':
                return parsedProblems[i].reduce((prod, n) => prod * n, 1);
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    });
}

function parseInput_part2(lines) {
    const operators = lines[lines.length - 1].trim().split(/\s+/);
    const rotatedNumbers = rotateNumbers(lines.slice(0, -1));
    return {rotatedNumbers, operators}
}

function part2(lines) {
    let {rotatedNumbers, operators} = parseInput_part2(lines);
    let answers = solveProblems(rotatedNumbers, operators);
    return answers.reduce((a, b) => a + b, 0);
}

function run(input) {
    const lines = input.trim().split('\n');
    console.log("LTR total:", part1(lines));
    console.log("RTL total:", part2(lines));
}

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
run(testInput);