// Creating Player with factory functions
const Player = (name, mark) => {
  // let moves;
  // let score;
  this.moves = [];
  this.score = 0;
  this.checkpoint = false;
  const getPlayerName = () => name;
  const getPlayerMark = () => mark;
  const getPlayerMoves = () => moves;
  const setPlayerMoves = (val) => moves.push(val);
  const getPlayerScore = () => score;
  
  return {
    name,
    mark,
    moves,
    getPlayerName,
    getPlayerMark,
    getPlayerMoves,
    getPlayerScore,
    setPlayerMoves,
    checkpoint,
  };
};

Array.prototype.sample = function(){
  return this[Math.floor(Math.random() * this.length)];
}

const placeMove = (position, player) => {
  console.log('player ' + player);
  console.log('position ' + position);
  position.innerHTML = player.getPlayerMark;
  playersetPlayerMoves(position);
};

// Creating a Module board
const Board = () => {
  // Winning combos
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
      cell.setAttribute('id', val);
      cell.className = 'cell';
      cell.addEventListener('click', turnClick, false);
      row.appendChild(cell);
    });
    table.appendChild(row);
  });


  const checkWinner = (player) => {
    streaks.forEach((item) => {
      const moves = player.getPlayerMoves;
      let line = moves.filter((value) => item.includes(value));
      if (line.length === 3) {
        return true
      }
    })
    return false;
  }
  return { boardgame, checkWinner };
};

// Creating a Module for Game
player1 = Player('Player 1', 'X');
const Game = (() => {
  board =  Board();
  computer = Player('Player 2', '0');

  function computersMove() {
    console.log('computers move')
    const cells = [1,2,3,4,5,6,7,8,9]
    const available = cells.filter((item) => !player1.getPlayerMoves().includes(item));
    let cMove = available.sample();
    computer.setPlayerMoves(parseInt(cMove));
  }  
  
  let isWinner = false;
  // while (!isWinner) {
    console.log('while')
    if (player1.checkpoint) {
      setTimeout(() => {
        computersMove();
      }, 1000);
      isWinner = true;
    }
    
  // }
  return { turn, computersMove }
})();

  
function turn(cellId) {
  console.log('cellId ', cellId);
  console.log('player ', player1);
  player1.checkpoint = true;
  player1.setPlayerMoves(cellId);
  document.getElementById(cellId).innerText = player1.getPlayerMark();
  player1.checkpoint = false;
}

function turnClick(cell) {
  console.log('cell '+ cell.target.id);
  turn(cell.target.id)
}


// Manipulating DOM

