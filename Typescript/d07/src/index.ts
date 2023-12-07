import fs from "fs";

const FIGURES: Record<string, string> = { "T": "A", "J": "B", "Q": "C", "K": "D", "A": "E" };
const FIGURES_JOKER: Record<string, string> = { "T": "A", "J": ".", "Q": "C", "K": "D", "A": "E" };

function classify(hand: string[]): number {
  const counts: number[] = hand.map(card => hand.filter(c => c === card).length);

  if (counts.includes(5)) return 6;
  if (counts.includes(4)) return 5;
  if (counts.includes(3)) {
    if (counts.includes(2)) return 4;
    return 3;
  }
  if (counts.filter(count => count === 2).length === 4) return 2;
  if (counts.includes(2)) return 1;
  return 0;
}

function classifyWithJoker(hand: string): number {
  let maxClassify = 0;
  const replacementsList = replacements(hand);

  for (const replacement of replacementsList) {
    const currentClassify = classify(replacement.split(''));
    if (currentClassify > maxClassify) {
      maxClassify = currentClassify;
    }
  }

  return maxClassify;
}


function strength(hand: string[], map: Record<string, string>): [number, string[]] {
  if (map["J"] === ".") return [classifyWithJoker(hand.join('')), hand.map(card => map[card] || card)];
  return [classify(hand), hand.map(card => map[card] || card)];
}

function replacements(hand: string): string[] {
  const stack: [string, number][] = [[hand, 0]];
  const results: string[] = [];

  while (stack.length > 0) {
    const [currentHand, index] = stack.pop()!;
    if (index === currentHand.length) {
      results.push(currentHand);
    } else {
      const firstChar = currentHand[index] === "J" ? "23456789TQKA" : currentHand[index];
      for (const char of firstChar) {
        stack.push([currentHand.slice(0, index) + char + currentHand.slice(index + 1), index + 1]);
      }
    }
  }

  return results;
}

function getTotalBid(input: string[], map: Record<string, string>): number {
  const plays: [string[], number][] = [];

  for (const line of input) {
    const [hand, bid] = line.split(' ');
    plays.push([hand.split(''), parseInt(bid, 10)]);
  }

  plays.sort((playA, playB) => {
    const strengthA = strength(playA[0], map)[0];
    const strengthB = strength(playB[0], map)[0];

    if (strengthA !== strengthB) {
      return strengthA - strengthB;
    } else {
      const cardsA = strength(playA[0], map)[1];
      const cardsB = strength(playB[0], map)[1];
      for (let i = 0; i < cardsA.length; i++) {
        if (cardsA[i] !== cardsB[i]) {
          return cardsA[i] < cardsB[i] ? -1 : 1;
        }
      }
      return 0;
    }
  });

  return plays.reduce((acc, [_, bid], rank) => acc + bid * (rank + 1), 0);
}

function part1(input: string[]) {
  return getTotalBid(input, FIGURES);
}

function part2(input: string[]) {
  return getTotalBid(input, FIGURES_JOKER);
}

console.log(part1(fs.readFileSync("./src/test.txt", "utf-8").split("\n")) === 6440);
console.log(part1(fs.readFileSync("./src/input.txt", "utf-8").split("\n")));
console.log(part2(fs.readFileSync("./src/test.txt", "utf-8").split("\n")) === 5905);
console.log(part2(fs.readFileSync("./src/input.txt", "utf-8").split("\n")));