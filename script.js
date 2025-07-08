const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    highlightWinner();
    setTimeout(() => {
      alert(`🎉 Player ${currentPlayer} wins!`);
    }, 100);
    return;
  }

  if (!board.includes('')) {
    gameActive = false;
    setTimeout(() => {
      alert(`🤝 It's a draw! Well played both.`);
    }, 100);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
    );
  });
}

function highlightWinner() {
  winningCombinations.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      document.querySelector(`.cell[data-index="${a}"]`).classList.add('winner');
      document.querySelector(`.cell[data-index="${b}"]`).classList.add('winner');
      document.querySelector(`.cell[data-index="${c}"]`).classList.add('winner');
    }
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
