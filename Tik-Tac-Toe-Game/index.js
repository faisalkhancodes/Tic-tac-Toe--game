// Select DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Debug selectors
console.log("Boxes found:", boxes.length);
console.log("Reset button:", resetBtn);
console.log("New game button:", newGameBtn);
console.log("Message container:", msgContainer);
console.log("Message:", msg);

let turnO = true; // Human (O) starts
let count = 0; // Track moves

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset game
const resetGame = () => {
  console.log("Resetting game...");
  turnO = true;
  count = 0;
  enableBoxes();
  if (msgContainer) msgContainer.classList.add("hide");
};

// Handle human click
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    console.log(`Box ${index} clicked`);
    if (turnO && !box.innerText) { // Human (O) move
      box.innerText = "O";
      box.classList.add("o"); // Black background
      box.disabled = true;
      count++;
      turnO = false;

      let isWinner = checkWinner();
      if (isWinner) return;

      if (count === 9) {
        gameDraw();
        return;
      }

      // Computer move
      setTimeout(computerMove, 500); // Delay for natural feel
    }
  });
});

// Computer move (random)
const computerMove = () => {
  console.log("Computer moving...");
  let availableBoxes = Array.from(boxes).filter(box => !box.innerText);
  console.log("Available boxes:", availableBoxes.length);
  if (availableBoxes.length === 0) return;

  let randomIndex = Math.floor(Math.random() * availableBoxes.length);
  let computerBox = availableBoxes[randomIndex];

  computerBox.innerText = "X";
  computerBox.classList.add("x"); // Red background
  computerBox.disabled = true;
  count++;
  turnO = true;

  let isWinner = checkWinner();
  if (!isWinner && count === 9) {
    gameDraw();
  }
};

// Game draw
const gameDraw = () => {
  console.log("Game draw");
  if (msg) msg.innerText = "O and X tied! Game was a Draw.";
  if (msgContainer) msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box, index) => {
    box.disabled = true;
    console.log(`Box ${index} disabled`);
  });
};

// Enable all boxes
const enableBoxes = () => {
  boxes.forEach((box, index) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o");
    console.log(`Box ${index} enabled`);
  });
};

// Show winner
const showWinner = (winner) => {
  console.log(`Winner: ${winner}`);
  if (msg) msg.innerText = `Congratulations, Winner is ${winner}!`;
  if (msgContainer) msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Button event listeners
if (newGameBtn) {
  newGameBtn.addEventListener("click", resetGame);
  console.log("New game button listener added");
} else {
  console.warn("New Game button not found.");
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetGame);
  console.log("Reset button listener added");
} else {
  console.warn("Reset button not found.");
}

// Start game
resetGame();