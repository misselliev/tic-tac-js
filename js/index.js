// Creating Player with factory functions
class Player {
  constructor(name, mark) {
    this.name = name;
    this.moves = [];
    this.score = 0;
    this.mark = mark;
    let checkpoint = false;
  }

  getPlayerName = () => this.name;
  getPlayerMark = () => this.mark;
  getPlayerMoves = () => this.moves;
  setPlayerMoves = val => this.moves.push(parseInt(val));
  getPlayerScore = () => score;
}

Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const placeMove = (position, player) => {
  console.log("player " + player);
  console.log("position " + position);
  position.innerHTML = player.getPlayerMark;
  playersetPlayerMoves(position);
};

// Creating a Module board
const streaks = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];
const Board = () => {
  // Winning combos
  const initMoves = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const boardgame = document.getElementById("board");
  const table = document.createElement("table");
  table.classList = "ui celled table";
  boardgame.appendChild(table);

  initMoves.forEach(items => {
    const row = document.createElement("tr");
    items.forEach(val => {
      const cell = document.createElement("td");
      cell.setAttribute("id", val);
      cell.className = "cell";
      cell.addEventListener("click", turnClick, false);
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return { boardgame };
};

const checkWinner = player => {
  if (player.moves.length >= 3) {
    for (let i = 0; i < streaks.length; i += 1) {
      const moves = player.getPlayerMoves();
      let line = moves.filter(value => streaks[i].includes(value));
      if (line.length === 3) {
        player.score += 1;
        if (player.name === "Human") {
          document.getElementById(
            "human_score"
          ).innerHTML = `Your score : ${player.score}`;
          document.getElementById("round_score").innerHTML = "You win!";
        } else {
          document.getElementById(
            "computer_score"
          ).innerHTML = `Computer score : ${player.score}`;
          document.getElementById("round_score").innerHTML = "Computer wins!";
        }
        return true;
      }
    }
  }
  return false;
};
// Creating a Module for Game
human = new Player("Human", "X");
computer = new Player("Computer", "0");
const Game = (() => {
  board = Board();

  function computersMove() {
    console.log("computers move");
    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let a = human.moves;
    let temp = a.concat(computer.moves);
    const available = cells.filter(item => !temp.includes(item));
    let cMove = available.sample();
    computer.setPlayerMoves(parseInt(cMove));
    console.log(cMove);
    document.getElementById(cMove).innerHTML = "0";
    return cMove;
  }
  return { turn, computersMove };
})();

function turn(cellId) {
  console.log("cellId ", cellId);
  console.log("player ", human);
  human.setPlayerMoves(cellId);
  document.getElementById(cellId).innerText = human.getPlayerMark();
}

function turnClick(cell) {
  console.log("cell " + cell.target.id);
  turn(cell.target.id);
  let winner = checkWinner(human);
  if (winner === false) {
    setTimeout(() => {
      Game.computersMove();
      checkWinner(computer);
    }, 1000);
  }
}
