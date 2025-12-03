function maxJoltage(bank) {
    const digits = bank.split('').map(Number); // Include all digits
    const first = Math.max(...digits.slice(0, -1)); // Exclude the last digit for `first`
    const firstIndex = digits.indexOf(first); // Find the index of the first highest number
    const second = Math.max(...digits.slice(firstIndex + 1)); // Consider subset starting after `first`
    return Number(`${first}${second}`);
}

function totalJoltage(banks) {
    let joltages = banks.map(maxJoltage);
    return joltages.reduce((a, b) => a + b, 0);
}

function run(input) {
    const lines = input.split('\n').filter(line => line.trim() !== '');

    console.log(`Total Joltage: ${totalJoltage(lines)}`);
}

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`;

run(testData);