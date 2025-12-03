function maxJoltage(bank,tail) {
    const digits = bank.split('').map(Number); // Include all digits
    const first = Math.max(...digits.slice(0, -tail)); // Exclude the last digit for `first`
    const firstIndex = digits.indexOf(first); // Find the index of the first highest number
    const second = (tail===1) 
        ? Math.max(...digits.slice(firstIndex + 1))
        : maxJoltage(bank.slice(firstIndex + 1), tail - 1); // Consider subset starting after `first`
    return Number(`${first}${second}`);
}

function totalJoltage(banks, batteries) {
    let joltages = banks.map(bank => maxJoltage(bank,batteries-1));
    return joltages.reduce((a, b) => a + b, 0);
}

function run(input) {
    const lines = input.split('\n').filter(line => line.trim() !== '');

    console.log(`Total Joltage, Part 1: ${totalJoltage(lines, 2)}`);
    console.log(`Total Joltage, Part 2: ${totalJoltage(lines, 12)}`);
}

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`;

run(testData);