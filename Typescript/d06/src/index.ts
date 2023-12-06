import fs from "fs";

function part1(records: [number, number][]): number {
  const waysToWin: { [key: number]: number } = {};
  records.forEach(([time, _]) => waysToWin[time] = 0);

  records.forEach(([time, record]) => {
    for (let hold = 1; hold <= time; hold++) {
      const distance = (time - hold) * hold;
      if (distance > record) {
        waysToWin[time]++;
      }
    }
  });

  return Object.values(waysToWin).reduce((acc, val) => acc * val, 1);
}

function part2(time: number, record: number): number {
  let wins = 0;
  for (let hold = 1; hold <= time; hold++) {
    const distance = (time - hold) * hold;
    if (distance > record) {
      wins++;
    }
  }
  return wins;
}

function parseInput1(input: string): [number, number][] {
  let lines = input
    .split("\n")
    .map(s => s.split(": ")[1])
    .map(s => s.split(/[ \t]+/g).map(s => parseInt(s)).filter(n => !isNaN(n)));
  let records: [number, number][] = [];
  for (let i = 0; i < lines[0].length; i++) {
    records.push([lines[0][i], lines[1][i]]);
  }
  return records;
}

function parseInput2(input: string): [number, number] {
  let lines = input
    .split("\n")
    .map(s => s.split(": ")[1])
    .map(s => s.split(/[ \t]+/g).map(s => parseInt(s)).filter(n => !isNaN(n)));
  let time = "";
  let distance = "";
  for (let i = 0; i < lines[0].length; i++) {
    time += lines[0][i];
    distance += lines[1][i];
  }
  return [parseInt(time), parseInt(distance)];
}

console.log(part1(parseInput1(fs.readFileSync("./src/input.txt", "utf-8"))));
console.log(part2(...parseInput2(fs.readFileSync("./src/input.txt", "utf-8"))));