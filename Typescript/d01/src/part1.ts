import fs from "fs";

export default function getNumbers() {
  const input = fs.readFileSync("./src/input.txt", "utf8");
  const lines = input.split("\n");
  const numbers = lines.map((line) => {
    const chars = line.split("");
    const res: number[] = [];

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (char.match(/[0-9]/)) {
        res.push(parseInt(char));
      }
    }
    return parseInt(res[0].toString() + res[res.length - 1].toString());
  });
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum;
}