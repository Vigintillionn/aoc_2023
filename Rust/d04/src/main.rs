use std::collections::HashSet;

fn main() {
  let input = std::fs::read_to_string("./src/input.txt").expect("Something went wrong reading the file");
  println!("Part 1: {}", part1(input.clone()));
  println!("Part 2: {}", part2(input));
}

fn part1(input: String) -> u32 {
  let mut sum = 0;
  for line in input.lines() {
    let game = line.split(": ").nth(1).unwrap();

    let winning_nums: HashSet<u32> = game
      .split(" | ")
      .nth(1)
      .unwrap()
      .split_ascii_whitespace()
      .map(|x| x.trim().parse::<u32>().unwrap())
      .collect();
    let nums: HashSet<u32> = game
      .split(" | ")
      .nth(0)
      .unwrap()
      .split_ascii_whitespace()
      .map(|x| x.trim().parse::<u32>().unwrap())
      .collect();

    let winning: Vec<u32> = winning_nums.intersection(&nums).copied().collect();
    if winning.len() > 0 {
      sum += u32::pow(2, (winning.len() as u32) - 1);
    }
  }
  sum
}

fn part2(input: String) -> u32 {
  let mut played = vec![1; input.lines().count()];

  for i in 0..input.lines().count() {
    let line = input.lines().nth(i).unwrap();
    let game = line.split(": ").nth(1).unwrap();

    let winning_nums: HashSet<u32> = game
      .split(" | ")
      .nth(1)
      .unwrap()
      .split_ascii_whitespace()
      .map(|x| x.trim().parse::<u32>().unwrap())
      .collect();
    let nums: HashSet<u32> = game
      .split(" | ")
      .nth(0)
      .unwrap()
      .split_ascii_whitespace()
      .map(|x| x.trim().parse::<u32>().unwrap())
      .collect();

    let winning: Vec<u32> = winning_nums.intersection(&nums).copied().collect();

    for j in 0..winning.len() {
      played[i + j + 1] += played[i];
    }
  }
  played.iter().sum()
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
      let input = std::fs::read_to_string("./src/test.txt").expect("Something went wrong reading the file");
        let result = part1(input);
        assert_eq!(result, 13);
    }
    #[test]
    fn test_part2() {
      let input = std::fs::read_to_string("./src/test.txt").expect("Something went wrong reading the file");
        let result = part2(input);
        assert_eq!(result, 30);
    }
}