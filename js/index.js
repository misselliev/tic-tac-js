// Creating Player with factory functions
const Player = (name, mark) => {
  // let moves;
  // let score;
  this.moves = [];
  this.score = 0;
  const getPlayerName = () => name;
  const getPlayerMark = () => mark;
  const getPlayerMoves = () => moves;
  const getPlayerScore = () => score;
  return {
    name,
    mark,
    moves,
    getPlayerName,
    getPlayerMark,
    getPlayerMoves,
    getPlayerScore
  };
};

// Creating a Module board
const Board = (() => {
  const initMoves = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const boardgame = document.getElementById('board');
  const table = document.createElement('table');
  table.classList = 'ui celled table';
  boardgame.appendChild(table);
  initMoves.forEach((items) => {
    const row = document.createElement('tr');
    items.forEach((val) => {
      const cell = document.createElement('td');
      cell.innerHTML = val;
      cell.setAttribute('id', `cell${val}`);
      cell.className = 'cell';
      cell.addEventListener('click', () => {
        cell.innerHTML = 'Z'
      });
      row.appendChild(cell);     
    });
    table.appendChild(row);
  });
  return { boardgame };
})();

// Creating a Module for Game
const Game = (() => {
  player1 = Player('player 1', 'X');
  player2 = Player('player 2', '0');

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

