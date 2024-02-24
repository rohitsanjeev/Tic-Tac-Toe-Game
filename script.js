document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const startButton = document.querySelector('.start-button');
    const resetButton = document.querySelector('.reset-button');
    const playAgainButton = document.querySelector('.play-again-button');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.querySelector('body');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameStarted = false;
    let gameEnded = false;
  
    function checkWinner() {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
  
      if (board.every(cell => cell !== '')) {
        return 'draw';
      }
  
      return null;
    }
  
    function handleCellClick(e) {
      const index = e.target.dataset.index;
      if (board[index] || !gameStarted || gameEnded) return;
  
      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;
  
      const winner = checkWinner();
      if (winner) {
        if (winner === 'draw') {
          message.textContent = "It's a draw!";
        } else {
          message.textContent = `${winner} wins!`;
        }
        gameEnded = true;
        playAgainButton.style.display = 'inline-block';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    function resetGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      cells.forEach(cell => {
        cell.textContent = '';
      });
      message.textContent = '';
      playAgainButton.style.display = 'none';
      gameEnded = false;
    }
  
    function startGame() {
      gameStarted = true;
      startButton.style.display = 'none';
      cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
      });
    }
  
    function playAgain() {
      resetGame();
      startGame();
    }
  
    function toggleDarkMode() {
      body.classList.toggle('dark-mode');
    }
  
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    playAgainButton.addEventListener('click', playAgain);
    darkModeToggle.addEventListener('click', toggleDarkMode);
  });
  