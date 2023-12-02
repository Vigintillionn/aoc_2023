import fs from "fs";
const stringToNum: { [key: string]: number } = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4, 
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
}

export default function getNumbers() {
  const input = fs.readFileSync("./src/input.txt", "utf-8");
  const lines = input.split("\n");

  const sum = lines.reduce((acc: number, line: string) => {
    const numbers: number[] = [];
    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j <= line.length; j++) {
        const buf = line.slice(i, j);
        if (buf.match(/[0-9]/) && buf.length === 1) {
          numbers.push(parseInt(buf));
        } else if (stringToNum[buf]) {
          numbers.push(stringToNum[buf]);
        }
      }
    }
    if (numbers.length === 0) return acc;
    return acc + parseInt(numbers[0].toString() + numbers[numbers.length - 1].toString());
  }, 0);

  return sum;
}