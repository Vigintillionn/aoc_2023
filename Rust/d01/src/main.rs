use std::fs;

fn main() {
    let input = fs::read_to_string("./src/input.txt").expect("Something went wrong reading the file");
    part1(input.clone());
    part2(input);
}

fn part1(input: String) {
    // Loop over each character in each line line untill we find a number
    let mut sum = 0;
    for line in input.lines() {
        let digits = line.chars().filter(|c| c.is_digit(10)).collect::<String>();
        let first = digits.chars().nth(0).unwrap();
        let last = digits.chars().nth(digits.len() - 1).unwrap();
        sum += first.to_digit(10).unwrap() * 10 + last.to_digit(10).unwrap();
    }
    println!("Part 1: {}", sum);
}

fn part2(input: String) {
    let parsed = input
        .replace("one", "o1e")
        .replace("two", "t2o")
        .replace("three", "th3ee")
        .replace("four", "4our")
        .replace("five", "5ive")
        .replace("six", "6ix")
        .replace("seven", "se7en")
        .replace("eight", "ei8ht")
        .replace("nine", "ni9e");
    part1(parsed);
}