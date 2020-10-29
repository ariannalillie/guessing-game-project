import * as fns from "./math.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const guess = document.getElementById("user-guess");
  const minNum = document.getElementById("min-number");
  const maxNum = document.getElementById("max-number");
  const newGameButton = document.getElementById("new-game");
  const rangeSubmitButton = document.getElementById("submit");
  const guessSubmitButton = document.getElementById("guess-button");
  const displayText = document.getElementById("display-text");
  const displayRange = document.getElementById("display-range");
  const displayTurnsLeft = document.getElementById("display-turns-left");
  let secretNumber;
  let turnsLeft = 5;

  document.addEventListener("input", (event) => {
    if (minNum.value !== "" && maxNum.value !== "") {
      rangeSubmitButton.disabled = false;
    }
    if (guess.value !== "") {
      guessSubmitButton.disabled = false;
    }
  });

  rangeSubmitButton.addEventListener("click", (event) => {
    secretNumber = fns.randomInRange(
      Number(minNum.value),
      Number(maxNum.value)
    );
    console.log(secretNumber);
    displayRange.innerHTML = `Min: ${minNum.value} Max:${maxNum.value}`;
    rangeSubmitButton.disabled = true;
    displayTurnsLeft.innerHTML = `Turns Left: ${turnsLeft}`;
  });

  guessSubmitButton.addEventListener("click", (event) => {
    if (turnsLeft) {
      let currentGuess = fns.checkGuess(Number(guess.value), secretNumber);
      turnsLeft--;
      switch (currentGuess) {
        case 2:
          displayText.innerHTML = "too high!!!!";
          break;
        case 1:
          displayText.innerHTML = "too low....";
          break;
        case 0:
          displayText.innerHTML = "juuuuust right";
          break;
      }
      displayTurnsLeft.innerHTML = `Turns Left: ${turnsLeft}`;
      guess.value = "";
    } else {
      guessSubmitButton.disabled = true;
      displayText.innerHTML = "You fail! Try harder next time 😝";
    }
  });

  newGameButton.addEventListener("click", (event) => {
    minNum.value = "";
    maxNum.value = "";
    guess.value = "";
    displayText.innerHTML = "";
    displayRange.innerHTML = "";
    displayTurnsLeft.innerHTML = "";
  });
});
