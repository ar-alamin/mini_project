const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restartBtn");
const alert_box = document.querySelector(".alert-box");

let current_player = "X";
let next_player = "O";
let player_turn = current_player;

player1.textContent = `Player 1: ${current_player}`;
player2.textContent = `Player 2: ${next_player}`;

// start game
function startGame() {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
}

// handle click function
function handleClick(e) {
  if (e.target.textContent === "") {
    e.target.textContent = player_turn;
    if (checkWin()) {
      showAlert(`${player_turn} is winner`);
      disableCells();
    } else if (checkTie()) {
      showAlert(`It's Tie!`);
      disableCells();
    } else {
      showAlert(`Turn for player ${player_turn}`);
      changePlayerTurn();
    }
  }
}

// change player
function changePlayerTurn() {
  if (player_turn === current_player) {
    player_turn = next_player;
  } else {
    player_turn = current_player;
  }
}

// check win
function checkWin() {
  const winingCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winingCondition.length; i++) {
    const [pos1, pos2, pos3] = winingCondition[i];
    if (
      gameCells[pos1].textContent !== "" &&
      gameCells[pos1].textContent === gameCells[pos2].textContent &&
      gameCells[pos2].textContent === gameCells[pos3].textContent
    ) {
      return true;
    }
  }
  return false;
}

// chech match tie
function checkTie() {
  let emptyCells = 0;
  gameCells.forEach((cell) => {
    if (cell.textContent === "") {
      emptyCells++;
    }
  });

  return emptyCells === 0 && !checkWin();
}

// disable game-board cells after a win or tie
function disableCells() {
  gameCells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.classList.add("disabled");
  });
}

// show alert
function showAlert(msg) {
  alert_box.textContent = msg;
  alert_box.style.display = "block";

  setTimeout(() => {
    alert_box.style.display = "none";
  }, 3000);
}

// restart game
restartBtn.addEventListener("click", function () {
  gameCells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
  startGame();
});

// call start game
startGame();
