fn main() {
    let input = std::fs::read_to_string("./src/input.txt").expect("Something went wrong reading the file");
    part1(input.clone());
    part2(input);
}

fn part1(input: String) {
    let mut sum = 0;

    for line in input.lines() {
        let mut game = line.split(": ");
        let id = game.clone().nth(0).unwrap().split(" ").nth(1).unwrap();
        if check_valid(game.nth(1).unwrap()) {
            sum += id.parse::<i32>().unwrap();
        }
    }
    println!("Part 1: {}", sum);
}

fn check_valid(game: &str) -> bool {
    let pulls = game.split("; ");
    for pull in pulls {
        let colors = pull.split(", ");
        for color in colors {
            let amm = color.split(" ").nth(0).unwrap().parse::<i32>().unwrap();
            let col = color.split(" ").nth(1).unwrap();
            if col == "red" && amm > 12 || col == "green" && amm > 13 || col == "blue" && amm > 14 {
                return false;
            }
        }
    }
    return true;
}

fn part2(input: String) {
    let mut sum = 0;
    for line in input.lines() {
        let game = line.split(": ").nth(1).unwrap();
        let pulls = game.split("; ");

        let mut max_red = 0;
        let mut max_green = 0;
        let mut max_blue = 0;

        for pull in pulls {
            let colors = pull.split(", ");
            for color in colors {
                let amm = color.split(" ").nth(0).unwrap().parse::<i32>().unwrap();
                let col = color.split(" ").nth(1).unwrap();
                if col == "red" && amm > max_red {
                    max_red = amm;
                } else if col == "green" && amm > max_green {
                    max_green = amm;
                } else if col == "blue" && amm > max_blue {
                    max_blue = amm;
                }
            }
        }
        sum += max_red * max_green * max_blue;
    }
    println!("Part 2: {}", sum);
}