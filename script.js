const cells = document.querySelectorAll("[data-cell]");
const O_CLASS = "o",
	X_CLASS = "x";
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
let xTurn;

const placeMarker = (cell, classToAdd) => {
	cell.classList.add(classToAdd);
};

const setTurn = () => {
	xTurn = !xTurn;
	board.classList.remove("o");
	board.classList.remove("x");
	board.classList.add(xTurn ? X_CLASS : O_CLASS);
};

const checkWin = classToCheck =>
	WINNING_COMBINATIONS.some(combination =>
		combination.every(cellIndex =>
			cells[cellIndex].classList.contains(classToCheck)
		)
	);

const checkDraw = () =>
	document.querySelectorAll(".cell.x").length +
		document.querySelectorAll(".cell.o").length ===
	9;
const showGameOver = (isDraw = true) => {
	if (isDraw) {
		result_text.innerHTML = `Match Drawn 😼`;
	} else {
		result_text.innerHTML = `${xTurn ? "X" : "O"} Wins! 🥇`;
	}
	result.classList.add("show");
};

const handleClick = e => {
	const currentCell = e.target;
	// place tic/tac
	const classToAdd = xTurn ? X_CLASS : O_CLASS;
	placeMarker(currentCell, classToAdd);

	// check for win/gameOver
	if (checkWin(classToAdd)) {
		showGameOver(false);
	} else if (checkDraw()) {
		showGameOver();
	}
	// swap turns and add proper hover class to board so we know whose turn it is
	else setTurn();
};

const startGame = () => {
	xTurn = false;
	setTurn();
	result.classList.remove("show");
	cells.forEach(cell => {
		// remove previous state
		cell.removeEventListener("click", handleClick);
		cell.classList.remove(O_CLASS);
		cell.classList.remove(X_CLASS);

		// only fires click event once for each cell
		cell.addEventListener("click", handleClick, { once: true });
	});
	result.classList.remove("show");
};

startGame();
restart.addEventListener("click", startGame);
