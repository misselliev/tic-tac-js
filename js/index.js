const Player = (name, mark) => {
  let moves = [];
  let score = 0;

  const getPlayerName = () => name;

  const getPlayerMark = () => mark;

  const getPlayerMoves = () => moves;

  const setPlayerMoves = val => moves.push(parseInt(val, 10));

  const resetPlayerMoves = () => {
    moves = [];
    return moves;
  };

  const getPlayerScore = () => score;

  return {
    name,
    mark,
    score,
    getPlayerMark,
    getPlayerMoves,
    getPlayerName,
    getPlayerScore,
    setPlayerMoves,
    resetPlayerMoves,
  };
};

const human = Player('Human', 'X');
const computer = Player('Computer', '0');

const displayWinner = (player) => {
  const str = (player.getPlayerName() === 'Human') ? 'You win!' : 'Computer wins!';
  const elemId = (player.getPlayerName() === 'Human') ? 'human_score' : 'computer_score';
  document.getElementById(elemId).innerHTML = player.score;
  document.getElementById('round_score').innerHTML = str;
};

const displayTie = () => { document.getElementById('round_score').innerHTML = 'Tie!'; };

const Game = (() => {
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
  const checkWinner = (player) => {
    if (player.getPlayerMoves().length >= 3) {
      let usedCells = human.getPlayerMoves();
      usedCells = usedCells.concat(computer.getPlayerMoves());

      for (let i = 0; i < streaks.length; i += 1) {
        const moves = player.getPlayerMoves();
        const line = moves.filter(value => streaks[i].includes(value));
        if (line.length === 3) {
          player.score += 1;
          displayWinner(player);
          blockButtons();
          return true;
        }
      }
      if (usedCells.length === 9) {
        displayTie();
        return true;
      }
    }
    return false;
  };

  const turn = (cellId) => {
    human.setPlayerMoves(cellId);
    document.getElementById(cellId).innerText = human.mark;
    document.getElementById(cellId).removeEventListener('click', turnClick);
  };

  const turnClick = (cell) => {
    turn(cell.target.id);
    const winner = checkWinner(human);
    if (winner === false) {
      setTimeout(() => {
        computersMove();
        checkWinner(computer);
      }, 500);
    }
  };

  const blockButtons = () => {
    const squares = document.querySelectorAll('td');
    squares.forEach(item => item.removeEventListener('click', turnClick));
  };

  const computersMove = () => {
    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let occupied = human.getPlayerMoves();
    occupied = occupied.concat(computer.getPlayerMoves());
    const available = cells.filter(item => !occupied.includes(item));
    const cMove = available[Math.floor(Math.random() * available.length)];
    computer.setPlayerMoves(parseInt(cMove, 10));
    document.getElementById(cMove).innerHTML = computer.mark;
    document.getElementById(cMove).removeEventListener('click', turnClick);
    return cMove;
  };

  return { turnClick };
})();

const Board = () => {
  const initMoves = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  const boardGame = document.getElementById('board');
  const table = document.createElement('table');
  table.classList = 'ui celled table';
  boardGame.appendChild(table);

  const clearGame = () => {
    human.resetPlayerMoves();
    computer.resetPlayerMoves();
    document.getElementById('round_score').innerHTML = 'Good luck!';
    const btns = document.querySelectorAll('td');
    btns.forEach((btn) => {
      btn.addEventListener('click', Game.turnClick);
      btn.innerHTML = '';
    });
  };

  const setResetButton = () => {
    const res = document.getElementById('reset_btn');
    res.addEventListener('click', clearGame);
  };

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

  setResetButton();
  return { boardGame };
};

Board();