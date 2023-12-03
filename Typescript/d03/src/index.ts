import fs from 'fs';

function getSymbols(input: string) {
  return new Set(input.split('').filter((char: string) => !char.match(/[0-9]|\.|(\n)/g)));
}

function getSurroundingNumbers(engineSchematic: string): number {
  const rows = engineSchematic.split('\n');
  let sum = 0;

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let i = 0; i < row.length; i++) {
      let char = row[i]; 
      let num = "";
      if (char.match(/[0-9]/)) {
        let isSurroundedBySymbol = checkSurroundedBy(rows, r, i);
        num += char;

        for (let j = i+1; j < row.length; j++) {
          if (row[j].match(/[0-9]/)) {
            num += row[j];
            if (checkSurroundedBy(rows, r, j)) {
              isSurroundedBySymbol = true;
            }
          } else {
            break;
          }
        }
        i += num.length - 1;
        if (isSurroundedBySymbol) {
          sum += parseInt(num);
        }
      }
    }
  }

  return sum;
}

function checkSurroundedBy(input: string[], row: number, col: number) {
  let isSurroundedBySymbol = false;
  let symbols = getSymbols(input.join(''));

  // Check up, down, left, right
  if (input[row - 1] && input[row - 1][col] && symbols.has(input[row - 1][col])) {
    isSurroundedBySymbol = true;
  }
  if (input[row + 1] && input[row + 1][col] && symbols.has(input[row + 1][col])) {
    isSurroundedBySymbol = true;
  }

  if (input[row][col - 1] && symbols.has(input[row][col - 1])) {
    isSurroundedBySymbol = true;
  }
  if (input[row][col + 1] && symbols.has(input[row][col + 1])) {
    isSurroundedBySymbol = true;
  }

  // Check diagonals
  if (input[row - 1] && input[row - 1][col - 1] && symbols.has(input[row - 1][col - 1])) {
    isSurroundedBySymbol = true;
  }
  if (input[row - 1] && input[row - 1][col + 1] && symbols.has(input[row - 1][col + 1])) {
    isSurroundedBySymbol = true;
  }

  if (input[row + 1] && input[row + 1][col - 1] && symbols.has(input[row + 1][col - 1])) {
    isSurroundedBySymbol = true;
  }
  if (input[row + 1] && input[row + 1][col + 1] && symbols.has(input[row + 1][col + 1])) {
    isSurroundedBySymbol = true;
  }

  return isSurroundedBySymbol;
}

function getGearRatios(engineSchematic: string): number {
  const rows = engineSchematic.split('\n');
  let sum = 0;

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let i = 0; i < row.length; i++) {
      let char = row[i];
      if (char === '*') {
        let adjacentPartNumbers = getAdjacentPartNumbers(rows, r, i);
        if (adjacentPartNumbers.length === 2) {
          let gearRatio = adjacentPartNumbers[0] * adjacentPartNumbers[1];
          sum += gearRatio;
        }
      }
    }
  }

  return sum;
}

function getAdjacentPartNumbers(input: string[], row: number, col: number): number[] {
  let partNumbers: number[] = [];

  if (input[row][col - 1] && input[row][col - 1].match(/[0-9]/)) {
    let num = "";
    for (let i = col - 1; i >= 0; i--) {
      if (input[row][i].match(/[0-9]/)) {
        num = input[row][i].toString() + num;
      } else {
        break;
      }
    }
    partNumbers.push(parseInt(num));
  }
  // Check right
  if (input[row][col + 1] && input[row][col + 1].match(/[0-9]/)) {
    let num = "";
    for (let i = col + 1; i < input[row].length; i++) {
      if (input[row][i].match(/[0-9]/)) {
        num += input[row][i].toString();
      } else {
        break;
      }
    }
    partNumbers.push(parseInt(num));
  }

  // Check up, if directly up, move to the left until we hit a symbol or . or \n then move to the right until we hit a symbol or . or \n and make a number
  let overlapUp = false;
  if (input[row - 1] && input[row - 1][col-1] && input[row - 1][col-1].match(/[0-9]/)) {
    let num = "";
    let i = col-1;
    while (input[row - 1][i-1] && input[row - 1][i-1].match(/[0-9]/)) i--;
    while (input[row - 1][i] && input[row - 1][i].match(/[0-9]/)) {
      num += input[row - 1][i].toString();
      i++;
    }
    if (i > col) overlapUp = true;
    partNumbers.push(parseInt(num));
  }
  
  let foundRightUp = false;
  if (!overlapUp && input[row - 1] && input[row - 1][col+1] && input[row - 1][col+1].match(/[0-9]/)) {
    foundRightUp = true;
    let num = "";
    let i = col+1;
    while (input[row - 1][i-1] && input[row - 1][i-1].match(/[0-9]/)) i--;
    while (input[row - 1][i] && input[row - 1][i].match(/[0-9]/)) {
      num += input[row - 1][i].toString();
      i++;
    }
    partNumbers.push(parseInt(num));
  }

  if (!foundRightUp && !overlapUp && input[row - 1] && input[row - 1][col] && input[row - 1][col].match(/[0-9]/)) {
    partNumbers.push(parseInt(input[row - 1][col]));
  }


  let overlapDown = false;
  if (input[row + 1] && input[row + 1][col-1] && input[row + 1][col-1].match(/[0-9]/)) {
    let num = "";
    let i = col-1;
    while (input[row + 1][i-1] && input[row + 1][i-1].match(/[0-9]/)) i--;
    while (input[row + 1][i] && input[row + 1][i].match(/[0-9]/)) {
      num += input[row + 1][i].toString();
      i++;
    }
    if (i > col) overlapDown = true;
    partNumbers.push(parseInt(num));
  }
  
  let foundRightDown = false;
  if (!overlapDown && input[row + 1] && input[row + 1][col+1] && input[row + 1][col+1].match(/[0-9]/)) {
    foundRightDown = true;
    let num = "";
    let i = col+1;
    while (input[row + 1][i-1] && input[row + 1][i-1].match(/[0-9]/)) i--;
    while (input[row + 1][i] && input[row + 1][i].match(/[0-9]/)) {
      num += input[row + 1][i].toString();
      i++;
    }
    partNumbers.push(parseInt(num));
  }

  if (!foundRightDown && !overlapDown && input[row + 1] && input[row + 1][col] && input[row + 1][col].match(/[0-9]/)) {
    partNumbers.push(parseInt(input[row + 1][col]));
  }

  return partNumbers;
}

function part1() {
  return getSurroundingNumbers(fs.readFileSync("./src/input.txt", 'utf-8'));
}

function part2() {
  return getGearRatios(fs.readFileSync("./src/input.txt", 'utf-8'));
}

console.log(getSurroundingNumbers(fs.readFileSync("./src/test.txt", 'utf-8')) == 4361);
console.log(part1());
console.log(getGearRatios(fs.readFileSync("./src/test.txt", 'utf-8')) == 467835);
console.log(part2());