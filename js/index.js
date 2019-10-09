// Creating Player with factory functions
class Player {
  constructor(name, mark) {
    this.name = name;
    this.moves = [];
    this.score = 0;
    this.mark = mark;
  }

  getPlayerName = () => {
    return this.name;
  };

  getPlayerMark = () => {
    return this.mark;
  };

  getPlayerMoves = () => {
    return this.moves;
  };

  setPlayerMoves = val => {
    return this.moves.push(parseInt(val, 10));
  };

  getPlayerScore = () => {
    return this.score;
  };
}
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
const human = new Player('Human', 'X');
const computer = new Player('Computer', '0');

Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const checkWinner = player => {
  if (player.moves.length >= 3) {
    for (let i = 0; i < streaks.length; i += 1) {
      const moves = player.getPlayerMoves();
      const line = moves.filter(value => streaks[i].includes(value));
      if (line.length === 3) {
        player.score += 1;
        if (player.name === 'Human') {
          document.getElementById(
            'human_score'
          ).innerHTML = `Your score : ${player.score}`;
          document.getElementById('round_score').innerHTML = 'You win!';
        } else {
          document.getElementById(
            'computer_score'
          ).innerHTML = `Computer score : ${player.score}`;
          document.getElementById('round_score').innerHTML = 'Computer wins!';
        }
        return true;
      }
    }
  }
  return false;
};

function turn(cellId) {
  human.setPlayerMoves(cellId);
  document.getElementById(cellId).innerText = human.getPlayerMark();
}

function turnClick(cell) {
  turn(cell.target.id);
  const winner = checkWinner(human);
  if (winner === false) {
    setTimeout(() => {
      Game.computersMove();
      checkWinner(computer);
    }, 1000);
  }
}

// Creating a Module board
const Board = () => {
  // Winning combos
  const initMoves = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const boardgame = document.getElementById('board');
  const table = document.createElement('table');
  table.classList = 'ui celled table';
  boardgame.appendChild(table);

  initMoves.forEach(items => {
    const row = document.createElement('tr');
    items.forEach(val => {
      const cell = document.createElement('td');
      cell.setAttribute('id', val);
      cell.className = 'cell';
      cell.addEventListener('click', turnClick, false);
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return { boardgame };
};

// Creating a Module for Game

const Game = (() => {
  Board();

  function computersMove() {
    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const a = human.moves;
    const temp = a.concat(computer.moves);
    const available = cells.filter(item => !temp.includes(item));
    const cMove = available.sample();
    computer.setPlayerMoves(parseInt(cMove, 10));
    document.getElementById(cMove).innerHTML = '0';
    return cMove;
  }
  return { turn, computersMove };
})();
