// Creating Player with factory functions
const Player = (name, mark) => {
  let moves;
  this.moves = [];
  const getPlayerName = () => name;
  const getPlayerMark = () => mark;
  const getPlayerMoves = () => moves;
  return { name, mark, moves, getPlayerName, getPlayerMark, getPlayerMoves };
};

// Creating a Module board
const Board = (() => {
  const initMoves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const boardgame = document.getElementById("board");
  const table = document.createElement("table");
  table.classList = "ui celled table";

  const row1 = document.createElement("tr");
  const cell1 = document.createElement("td");
  cell1.innerHTML = initMoves[0];
  const cell2 = document.createElement("td");
  cell2.innerHTML = initMoves[1];
  const cell3 = document.createElement("td");
  cell3.innerHTML = initMoves[2];
  boardgame.appendChild(table);
  table.appendChild(row1);
  row1.appendChild(cell1);
  row1.appendChild(cell2);
  row1.appendChild(cell3);

  const row2 = document.createElement("tr");
  const cell4 = document.createElement("td");
  cell4.innerHTML = initMoves[3];
  const cell5 = document.createElement("td");
  cell5.innerHTML = initMoves[4];
  const cell6 = document.createElement("td");
  cell6.innerHTML = initMoves[5];
  boardgame.appendChild(table);
  table.appendChild(row2);
  row2.appendChild(cell4);
  row2.appendChild(cell5);
  row2.appendChild(cell6);

  const row3 = document.createElement("tr");
  const cell7 = document.createElement("td");
  cell7.innerHTML = initMoves[6];
  const cell8 = document.createElement("td");
  cell8.innerHTML = initMoves[7];
  const cell9 = document.createElement("td");
  cell9.innerHTML = initMoves[8];
  boardgame.appendChild(table);
  table.appendChild(row3);
  row3.appendChild(cell7);
  row3.appendChild(cell8);
  row3.appendChild(cell9);
})();

// Creating a Module for Game
const Game = (() => {
  player1 = Player("player 1", "X");
  player2 = Player("player 2", "0");

  // Winning combos
  let streaks = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
})();

// Manipulating DOM
Board();
