document.addEventListener("DOMContentLoaded", () => {

    const board = document.getElementById("board");

    const cells = document.querySelectorAll(".cell");

    const statusText = document.getElementById("status");

    const resetButton = document.getElementById("reset");

    const aiButton = document.getElementById("ai-mode");

    let boardState = ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = "X";

    let gameActive = true;

    let aiMode = false;

    const winningCombos = [

        [0, 1, 2], [3, 4, 5], [6, 7, 8],

        [0, 3, 6], [1, 4, 7], [2, 5, 8],

        [0, 4, 8], [2, 4, 6]

    ];

    function checkWinner() {

        for (let combo of winningCombos) {

            let [a, b, c] = combo;

            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {

                gameActive = false;

                statusText.textContent = `Player ${boardState[a]} Wins!`;

                return;

            }

        }

        if (!boardState.includes("")) {

            gameActive = false;

            statusText.textContent = "It's a Draw!";

        }

    }

    function aiMove() {

        let emptyCells = boardState.map((val, index) => val === "" ? index : null).filter(val => val !== null);

        if (emptyCells.length > 0) {

            let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

            boardState[randomIndex] = "O";

            cells[randomIndex].textContent = "O";

            checkWinner();

            currentPlayer = "X";

            statusText.textContent = "Player X's turn";

        }

    }

    function handleCellClick(e) {

        const index = e.target.dataset.index;

        if (!gameActive || boardState[index] !== "") return;

        boardState[index] = currentPlayer;

        e.target.textContent = currentPlayer;

        checkWinner();

        if (gameActive) {

            currentPlayer = currentPlayer === "X" ? "O" : "X";

            statusText.textContent = `Player ${currentPlayer}'s turn`;

            if (aiMode && currentPlayer === "O" && gameActive) {

                setTimeout(aiMove, 500);

            }

        }

    }

    function resetGame() {

        boardState = ["", "", "", "", "", "", "", "", ""];

        currentPlayer = "X";

        gameActive = true;

        statusText.textContent = "Player X's turn";

        cells.forEach(cell => cell.textContent = "");

    }

    function toggleAIMode() {

        aiMode = !aiMode;

        aiButton.textContent = aiMode ? "AI Mode: ON" : "Play Against AI";

        resetGame();

    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));

    resetButton.addEventListener("click", resetGame);

    aiButton.addEventListener("click", toggleAIMode);

});