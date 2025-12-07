function parseInput(input) {
    const lines = input.trim().split('\n');
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

function run(input) {
    let {numbers, operators} = parseInput(input);

    let answers = solveColumns(numbers, operators);
    console.log("Grand total:", answers.reduce((a, b) => a + b, 0));
}

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
run(testInput);