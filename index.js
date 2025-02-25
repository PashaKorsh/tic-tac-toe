const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [];
let currentPlayer = CROSS;
let gameOver = false;

startGame();
addResetListener();

function startGame() {
    field = Array.from({ length: 3 }, () => Array(3).fill(EMPTY));
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = field[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (gameOver || field[row][col] !== EMPTY) return;

    field[row][col] = currentPlayer;
    renderSymbolInCell(currentPlayer, row, col);

    if (checkWin(currentPlayer)) {
        gameOver = true;
        alert(`Победил ${currentPlayer}`);
        highlightWinningCells(currentPlayer);
        return;
    }

    if (checkDraw()) {
        gameOver = true;
        alert("Победила дружба");
        return;
    }

    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    field = Array.from({ length: 3 }, () => Array(3).fill(EMPTY));
    currentPlayer = CROSS;
    gameOver = false;
    renderGrid(3);
}

function checkWin(player) {
    for (let i = 0; i < field.length; i++) {
        if (field[i].every(cell => cell === player)) return true;
        if (field.every(row => row[i] === player)) return true;
    }

    if (field.every((row, index) => row[index] === player)) return true;
    if (field.every((row, index) => row[field.length - 1 - index] === player)) return true;

    return false;
}

function highlightWinningCells(player) {
    for (let i = 0; i < field.length; i++) {
        if (field[i].every(cell => cell === player)) {
            for (let j = 0; j < field.length; j++) {
                renderSymbolInCell(player, i, j, 'red');
            }
            return;
        }
    }

    for (let j = 0; j < field.length; j++) {
        if (field.every(row => row[j] === player)) {
            for (let i = 0; i < field.length; i++) {
                renderSymbolInCell(player, i, j, 'red');
            }
            return;
        }
    }

    if (field.every((row, index) => row[index] === player)) {
        for (let i = 0; i < field.length; i++) {
            renderSymbolInCell(player, i, i, 'red');
        }
        return;
    }

    if (field.every((row, index) => row[field.length - 1 - index] === player)) {
        for (let i = 0; i < field.length; i++) {
            renderSymbolInCell(player, i, field.length - 1 - i, 'red');
        }
        return;
    }
}

function checkDraw() {
    return field.every(row => row.every(cell => cell !== EMPTY));
}

/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}