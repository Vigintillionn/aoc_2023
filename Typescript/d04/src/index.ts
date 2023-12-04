import fs from "fs";

function part1(input: string) {
  let games = input.split("\n");
  let sum = 0;
  for (const game of games) {
    let winningNumbers = game.split(" | ")[0].split(": ")[1].split(" ").filter(s => !isNaN(parseInt(s)));
    let numbers = game.split(" | ")[1].split(" ").filter(s => !isNaN(parseInt(s)));

    let totalWinning = numbers.reduce((acc, curr) => acc + (winningNumbers.includes(curr) ? 1 : 0), 0);
    if (totalWinning > 0) sum += Math.pow(2, totalWinning - 1);
  }
  return sum;
}

function part2(input: string): number {
  let games = input.split("\n");
  let played = new Array(games.length).fill(1);

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    let winningNumbers = game.split(" | ")[0].split(": ")[1].split(" ").filter(s => !isNaN(parseInt(s)));
    let numbers = game.split(" | ")[1].split(" ").filter(s => !isNaN(parseInt(s)));

    let totalWinning = numbers.reduce((acc, curr) => acc + (winningNumbers.includes(curr) ? 1 : 0), 0);

    for (let j = 0; j < totalWinning; j++) {
      played[i + j + 1] += played[i];
    }
  }
  return played.reduce((acc, curr) => acc + curr, 0);
}

console.log(part1(fs.readFileSync('./src/test.txt', 'utf8')) === 13);
console.log(part1(fs.readFileSync('./src/input.txt', 'utf8')));
console.log(part2(fs.readFileSync('./src/test.txt', 'utf8')) === 30);
console.log(part2(fs.readFileSync('./src/input.txt', 'utf8')));