'use strict';
const Player = ( name, mark ) => {
  let moves = [];
  let score = 0;

  const getPlayerName = () => name;

  const getPlayerMark = () => mark;

  const getPlayerMoves = () => moves;

  const setPlayerMoves = val => moves.push(parseInt(val, 10));

  const resetPlayerMoves = () => moves = [];

  const getPlayerScore = () => score;

  return { name, mark, score, getPlayerMark, getPlayerMoves, getPlayerName, getPlayerScore, setPlayerMoves, resetPlayerMoves }
};

const streaks = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const human = Player('Human', 'X');
const computer = Player('Computer', '0');

// Array.prototype.sample = function () {
//   return this[Math.floor(Math.random() * this.length)];
// };

const Game = (() => {
  const checkWinner = (player) => {
    if (player.getPlayerMoves().length >= 3) {
      const c = human.getPlayerMoves();
      const joinMoves = c.concat(computer.getPlayerMoves());
      for (let i = 0; i < streaks.length; i += 1) {
        const moves = player.getPlayerMoves();
        const line = moves.filter(value => streaks[i].includes(value));
        if (line.length === 3) {
          player.score += 1;
          if (player.name === 'Human') {
            document.getElementById('human_score').innerHTML = `Your score : ${player.score}`;
            document.getElementById('round_score').innerHTML = 'You win!';
          } else {
            document.getElementById('computer_score').innerHTML = `Computer score : ${player.score}`;
            document.getElementById('round_score').innerHTML = 'Computer wins!';
          }
          blockButtons();
          return true;
        }
      }
      if (joinMoves.length === 9) {
        document.getElementById('round_score').innerHTML = 'Tie!';
        return true;
      }
    }
    return false;
  };

  function turn(cellId) {
    human.setPlayerMoves(cellId);
    document.getElementById(cellId).innerText = human.mark;
    document.getElementById(cellId).removeEventListener('click', turnClick);
  }
  function turnClick(cell) {
    turn(cell.target.id);
    const winner = checkWinner(human);
    if (winner === false) {
      setTimeout(() => {
        Game.computersMove();
        checkWinner(computer);
      }, 500);
    }
  }
  function blockButtons() {
    const squares = document.querySelectorAll('td');
    squares.forEach(item => item.removeEventListener('click', turnClick));
  }
  function computersMove() {
    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const a = human.getPlayerMoves();
    const temp = a.concat(computer.getPlayerMoves());
    const available = cells.filter(item => !temp.includes(item));
    const cMove = available[Math.floor(Math.random() * available.length)];
    computer.setPlayerMoves(parseInt(cMove, 10));
    document.getElementById(cMove).innerHTML = computer.mark;
    document.getElementById(cMove).removeEventListener('click', turnClick);
    return cMove;
  }

  return {
    turn, computersMove, turnClick, checkWinner,
  };
})();

const Board = () => {
  // Winning combos
  const initMoves = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const boardgame = document.getElementById('board');
  const table = document.createElement('table');
  table.classList = 'ui celled table';
  boardgame.appendChild(table);

  initMoves.forEach((items) => {
    const row = document.createElement('tr');
    items.forEach((val) => {
      const cell = document.createElement('td');
      cell.setAttribute('id', val);
      cell.className = 'cell';
      cell.addEventListener('click', Game.turnClick, false);
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return { boardgame };
};

function clearGame() {
  human.resetPlayerMoves();
  computer.resetPlayerMoves();
  document.getElementById('round_score').innerHTML = 'Good luck!';
  const btns = document.querySelectorAll('td');
  btns.forEach((btn) => {
    btn.addEventListener('click', Game.turnClick);
    btn.innerHTML = '';
  });
}

function resetGame() {
  const res = document.getElementById('reset_btn');
  res.addEventListener('click', clearGame);
}

Board();
resetGame();