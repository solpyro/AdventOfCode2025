const { fetchInput } = require('./fetchInput.js');

function parseInput(input) {
    let lines = input.trim().split('\n').map(line => line.trim());
    let machines = lines.map(line => {
        let patternMatch = line.match(/^\[([.#]+)\]/);
        let buttonMatch = line.match(/\(([\d,]+)\)/g);
        let joltageMatch = line.match(/\{([\d,]+)\}/);
        
        let pattern = patternMatch ? patternMatch[1].split('').map(c => c === '#') : [];    
        let buttons = buttonMatch ? buttonMatch.map(b => b.slice(1, -1).split(',').map(Number)) : [];
        let joltageRatings = joltageMatch ? joltageMatch[1].split(',').map(Number) : [];

        return {
            initPattern: pattern,
            buttons: buttons,
            joltageRatings: joltageRatings
        };
    });
    return machines;
}

function calculateMinimumButtonPresses(machine) {
    let { initPattern, buttons, joltageRatings } = machine;

    // write a function to calculate the minimum button presses required to turn an empty array into the initPattern
    let targetPattern = initPattern;
    let n = targetPattern.length;
    let dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0; 
    for (let i = 1; i <= n; i++) {
        for (let b = 0; b < buttons.length; b++) {
            let button = buttons[b];
            let newPattern = new Array(n).fill(false);
            for (let pos of button) {
                if (pos < n) newPattern[pos] = true;
            }   
            let canPress = true;
            for (let j = 0; j < n; j++) {
                if (newPattern[j] && !targetPattern[j]) {
                    canPress = false;
                    break;
                }
            }
            if (canPress) {
                let prevPattern = targetPattern.map((val, idx) => val && !newPattern[idx]);
                let prevIndex = prevPattern.reduce((acc, val, idx) => acc + (val ? (1 << idx) : 0), 0);
                dp[i] = Math.min(dp[i], dp[prevIndex] + 1);
            }
        }
    }
    return dp[n];
}

function run(input) {
    let machines = parseInput(input);
    
    let minimumButtonPresses = machines.map(calculateMinimumButtonPresses);

    console.log("Minimum button presses for each machine:", minimumButtonPresses);
    console.log("Sum of minimum button presses:", minimumButtonPresses.reduce((a, b) => a + b, 0));
}

const testInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;
run(testInput);

fetchInput(10, (input) => {
    run(input);
});