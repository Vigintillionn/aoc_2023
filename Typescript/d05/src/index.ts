import fs from "fs";

function part1(input: string): number {
  let [seedString, ...blocks] = input.split("\n\n");
  let seeds = seedString.split(": ")[1].split(" ").map(s => parseInt(s));
  
  for (const block of blocks) {
    let ranges = [];
    for (const line of block.split("\n").slice(1)) {
      ranges.push(line.split(" ").map(s => parseInt(s)));
    }
    let n = [];
    for (const x of seeds) {
      let found = false;
      for (const [a, b, c] of ranges) {
        if (b <= x && x < b + c) {
          found = true;
          n.push(x - b + a);
          break;
        }
      }
      if (!found) n.push(x);
    }
    seeds = n;
  }

  return Math.min(...seeds);
}

function part2(input: string): number {
  let [seedString, ...blocks] = input.split("\n\n");
  let inputs = seedString.split(": ")[1].split(" ").map(s => parseInt(s));
  let seeds: number[][] = [];

  for (let i = 0; i < inputs.length; i += 2) {
    seeds.push([inputs[i], inputs[i] + inputs[i + 1]]);
  }
  
  for (const block of blocks) {
    let ranges = [];
    for (const line of block.split("\n").slice(1)) {
      ranges.push(line.split(" ").map(s => parseInt(s)));
    }
    let n = [];
    while (seeds.length > 0) {
      let popped = seeds.pop();
      if (!popped) break;
      let [start, end] = popped;
      let found = false;
      for (const [a, b, c] of ranges) {
        let overlapStart = Math.max(start, b);
        let overlapEnd = Math.min(end, b + c);
        if (overlapStart < overlapEnd) {
          found = true;
          n.push([overlapStart - b + a, overlapEnd - b + a]);
          if (overlapStart > start) seeds.push([start, overlapStart]);
          if (overlapEnd < end) seeds.push([overlapEnd, end]);
          break;
        }
      }
      if (!found) n.push([start, end]);
    }
    seeds = n;
  }

  let smallestTuple = smallestStartingTuple(seeds);
  return Math.min(...smallestTuple);
}

function smallestStartingTuple(tuples: number[][]): number[] {
  let smallest = tuples[0];
  for (const tuple of tuples) {
    if (tuple[0] < smallest[0]) smallest = tuple;
  }
  return smallest;
}



console.log(part1(fs.readFileSync('./src/test.txt', 'utf8')) === 35);
console.log(part1(fs.readFileSync('./src/input.txt', 'utf8')));
console.log(part2(fs.readFileSync('./src/test.txt', 'utf8')) === 46);
console.log(part2(fs.readFileSync('./src/input.txt', 'utf8')));