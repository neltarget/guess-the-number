let randomNum = Math.ceil(Math.random() * 15);
const hiddenNum = document.getElementById("hidden-num");
let guessBtn = document.getElementById("guess-btn");
let guessInput = document.getElementById("guess");
let hint = document.getElementById("hint");
let livesLabel = document.getElementById("lives-info");
let lives = 5;
let timer = document.getElementById("timer");
let timerInterval;
let isTimerRunning = false;

checkGuess = () => {
  //start timer
  if (!isTimerRunning) {
    startTimer();
    isTimerRunning = true;
  }
  //guess input
  let guess = parseInt(document.getElementById("guess").value);

  //no guess
  if (!guess) {
    hint.textContent = "📛No number!";

    //correct guess
  } else if (guess === randomNum) {
    hint.innerText = "Correct✅ You Win🕺🏻";
    hiddenNum.textContent = randomNum;
    guessBtn.disabled = true;
    guessInput.disabled = true;
    hint.classList.add("game-won");
    clearInterval(timerInterval); //stop timer

    //incorrect guess
  } else if (guess !== randomNum && guess >= 1 && guess <= 15) {
    if (lives > 1) {
      hint.innerText =
        guess < randomNum
          ? "📉Your guess is too low."
          : "💹Your guess is too high";
      lives--;
      livesLabel.innerText = `You have ${lives}💎 left`;
      livesLabel.classList.add("diamond");

      //out of lives - game lost
    } else {
      hint.innerText = `☠️You lost, Play Again❔`;
      livesLabel.innerText = `You have 0 💎`;
      hint.classList.add("game-over");
      guessBtn.disabled = true;
      guessInput.disabled = true;
      clearInterval(timerInterval);
    }
    // guess out of range
  } else {
    hint.innerText = `🚫Enter a valid number within range`;
  }
};

//timer settings
startTimer = () => {
  let timeLeft = 30;
  timer.textContent = `⏱️: 00:30`;

  timerInterval = setInterval(() => {
    timeLeft--;

    //timer display
    let minutes = String(Math.trunc(timeLeft / 60)).padStart(2, "0");
    let seconds = String(timeLeft % 60).padStart(2, "0");
    timer.textContent = `⏱️: ${minutes}:${seconds}`;

    //timed out - game lost
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      hint.innerHTML = `⏱️Timed out! Game over☠️`;
      hint.classList.add("game-over");
      guessBtn.disabled = true;
      guessInput.disabled = true;
    }
  }, 1000);
};

//game reset
resetGame = () => {
  randomNum = Math.ceil(Math.random() * 15);
  hiddenNum.textContent = "❔";
  lives = 5;
  livesLabel.innerText = `You have 5💎`;
  hint.innerHTML = "⚡Start guessing...";
  guess.value = "";
  guessBtn.disabled = false;
  guessInput.disabled = false;
  clearInterval(timerInterval);
  timer.textContent = "⏱️: 30 seconds";
  hint.classList.remove("game-over");
  hint.classList.remove("winner");
  isTimerRunning = false;
};
