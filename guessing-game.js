const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber;
let numAttempts;

const randomInRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

function checkGuess(num) {
  if (num > secretNumber) {
    console.log("Too high");
    return false;
  } else if (num < secretNumber) {
    console.log("Too low");
    return false;
  } else {
    console.log("Correct!");
    return true;
  }
}

function askGuess() {
  rl.question("Enter a Guess, you have  " + numAttempts + " left ", (input) => {
    let answer = checkGuess(Number(input));
    numAttempts--;
    if (!answer && numAttempts > 0) {
      askGuess();
    } else {
      if (numAttempts === 0) {
        rl.close();
        console.log("No more turns! You lose!");
      } else {
        rl.close();
        console.log("You Win!");
      }
    }
  });
}

function askRange() {
  rl.question("Enter a max number ", (input) => {
    let maxNumber = input;
    console.log("*" + maxNumber + "*");
    rl.question("Enter a min number ", (input) => {
      let minNumber = input;
      console.log("*" + minNumber + "*");
      secretNumber = randomInRange(Number(minNumber), Number(maxNumber));
      return askGuess();
    });
  });
}

function askTurnLimit() {
  rl.question("How many turns do you want? ", (input) => {
    numAttempts = input;
    return askRange();
  });
}

askTurnLimit();
