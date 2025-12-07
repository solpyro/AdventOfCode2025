# Advent of Code 2025

This year I'll be quick & dirty, writing in JS (not even typescript) and using work's copilot assist.

Use `node {day file}` in the terminal to run a day's solution in VS Code

## Day 1: Secret Entrance ⭐⭐

Of course, day 1, part 1 is simple. 

For part 2, I know I must be double counting somehow, but I can't figure out where. Brute force was fast enough anyway (literally clicking through and checking for 0 each move) even if it feels dirty.

## Day 2: Gift Shop ✨✨

I was overwhelmed by part 1, and turned to Copilot for some help. Considering how hit & miss it is for my _actual_ work, I was surprised by how accurate the response was. given my minimal prompt.

Laziness begets laziness, and I let GPT-4.1 complete the second half as well. Reviewing the code, I understand what it's doing, but I don't think I'd have written it that way myself. For one, I don't know the modern Javascript API that well; my knowledge is almost 5 years old and was firmly reliant on JQuery.

## Day 3: Lobby ✨⭐

I understood the assignment, but I get an AI star because I asked GPT to implement the `maxJoltage` function, based on comments that outlined the algorithm. It was lucky I knew the algorithm, since I had to coach Copilot through almost every step of the implementation.

Day 3 and already I feel the call of recursion. Very satisfying to modify part 1, run it and get the correct answer on the first try.

## Day 4: Printing Department ⭐⭐

A pretty straightforward field automata exercise, with part 1 being step 1 of the phase change.

And part 2 was pretty simple as well.

## Day 6: Trash Compactor ⭐✨

Part 1 was straight forward, which makes me nervous for part 2.

I was right to be nervous. I guess the simplest way to solve this as exactly as described;consuming a column at a time, evaluating the number and waiting until the operator before combining the set. GPT helped with rotating the input, processing the data and debugging the problems.

## Day 7: Laboratories ✨

I had most of the algorithm in my head, but GPT wrote it out for me and also debuggied a couple of issues. I still had to spot the incorrect third stream that they'd managed to sneak in.

Part 2 was all me, since it was one of the bugs I dealt with in the first part (not removing duplicate streams). I got the right answer for the example, but there's clearly some optimization to be done, as the real data crashed out having exhaused the available RAM.