import { readFileSync } from 'fs';

function parseInput(input: string): string[][] {
    return input.split('\n').map((line) => line.split(';').map((subset) => subset.trim()));
}

function getColors(subset: string): string[] {
    return subset.replace(/Game .:/g, "").split(' ').filter((color) => color.match(/(red|green|blue)/)).map(str => str.replace(',', ''));
}

function getNumbers(subset: string): number[] {
    return subset.replace(/Game .:/g, "").split(' ').filter((color) => color.match(/^[1-9]\d*$/)).map(str => parseInt(str));
}

function checkColors(colors: { [color: string]: number }, red: number, green: number, blue: number): boolean {
  return (colors['red'] ?? 0) <= red && (colors['green'] ?? 0) <= green && (colors['blue'] ?? 0) <= blue;
}

function part1() {
  let input = parseInput(readFileSync("./src/input.txt", 'utf-8'));
  let sum = 0;
  for (const game of input) {
    let id = game[0].split(':')[0].split(' ')[1];
    let impossible = false;

    for (const draw of game) {
      const nums = getNumbers(draw);
      const cols = getColors(draw);
      let colors: { [color: string]: number } = {};
      for (let i = 0; i < nums.length; i++) {
        colors[cols[i]] = nums[i];
      }
      console.log(colors)
      if (!checkColors(colors, 12, 13, 14)) {
        impossible = true;
        break;
      }
    }
    if (!impossible) {
      console.log(id)
      sum += parseInt(id);
    }
  }
  return sum;
}

function part2() {
  let input = parseInput(readFileSync("./src/input.txt", 'utf-8'));
  let sum = 0;
  for (const game of input) {
    let maxColors: { [color: string]: number } = {}
    for (const draw of game) {
      const nums = getNumbers(draw);
      const cols = getColors(draw);
      for (let i = 0; i < nums.length; i++) {
        if (!maxColors[cols[i]] || maxColors[cols[i]] < nums[i]) maxColors[cols[i]] = nums[i];
      }
    }
    let product = Object.keys(maxColors).reduce((acc, key) => acc * maxColors[key], 1);
    sum += product;
  }
  return sum;
}

console.log(part1())
console.log(part2())
