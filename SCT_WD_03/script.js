const boardElem = document.getElementById('board');
const statusElem = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let board, currentPlayer, gameActive;

function init() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  render();
  setStatus(`Player ${currentPlayer}'s turn`);
}

function render() {
  boardElem.innerHTML = '';
  board.forEach((value, idx) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = idx;
    square.textContent = value;
    square.onclick = handleSquareClick;
    boardElem.appendChild(square);
  });
}

function handleSquareClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || board[idx]) return;
  board[idx] = currentPlayer;
  if (checkWin(currentPlayer)) {
    setStatus(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (board.every(cell => cell)) {
    setStatus("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setStatus(`Player ${currentPlayer}'s turn`);
  }
  render();
}

function setStatus(msg) {
  statusElem.textContent = msg;
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],   // rows
    [0,3,6],[1,4,7],[2,5,8],   // cols
    [0,4,8],[2,4,6]            // diags
  ];
  return winPatterns.some(pattern =>
    pattern.every(idx => board[idx] === player)
  );
}

resetBtn.onclick = init;

// Start game
init();
