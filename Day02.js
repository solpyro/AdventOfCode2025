const { fetchInput } = require('./fetchInput.js');

function parseInput(input)
{
    return input.split(',').map(range => {
        const [start, end] = range.split('-').map(Number);
        return { start, end };
    });
}

// Function to find numbers with a repeating pattern (pattern of any length, repeated exactly once)
function findRepeatingPatternNumbers_ExactlyTwice(ranges) {
	const result = [];
	// Parse input into ranges
	for (const {start, end} of ranges) {
		for (let n = start; n <= end; n++) {
			const s = n.toString();
			const len = s.length;
			// Try all possible pattern lengths (must divide length by 2)
			for (let l = 1; l <= Math.floor(len / 2); l++) {
				if (len === 2 * l) {
					const pattern = s.slice(0, l);
					if (pattern.repeat(2) === s) {
						result.push(n);
						break;
					}
				}
			}
		}
	}
	return result;
}

// Function to find numbers with a repeating pattern (pattern of any length, repeated at least twice)
function findRepeatingPatternNumbers_TwiceOrMore(ranges) {
	const result = [];
	for (const { start, end } of ranges) {
		for (let n = start; n <= end; n++) {
			const s = n.toString();
			const len = s.length;
			// Try all possible pattern lengths
			for (let l = 1; l <= Math.floor(len / 2); l++) {
				if (len % l === 0) {
					const pattern = s.slice(0, l);
					const repeatCount = len / l;
					if (pattern.repeat(repeatCount) === s && repeatCount >= 2) {
						result.push(n);
						break;
					}
				}
			}
		}
	}
	return result;
}

function findInvalidIds(input) {
    let parsedInput = parseInput(input);
    const repeatingPatternNumbers = findRepeatingPatternNumbers_ExactlyTwice(parsedInput);
    console.log(`Part 1: ${repeatingPatternNumbers.reduce((a, b) => a + b, 0)}`);
    const repeatingPatternNumbersTwiceOrMore = findRepeatingPatternNumbers_TwiceOrMore(parsedInput);
    console.log(`Part 2: ${repeatingPatternNumbersTwiceOrMore.reduce((a, b) => a + b, 0)}`);
}

let testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`
findInvalidIds(testInput);

fetchInput(2, (input) => {
    findInvalidIds(input);
});