const IDEAL_BOARD_DIM = 500;

function createBoard(squareNo) {
    boardContainer = document.querySelector('#board-container');

    // Clear any existing child nodes;
    boardContainer.innerHTML = "";

    for (let i = 0; i < squareNo; i++) {
        newRow = document.createElement('div');
        newRow.classList.add('board-row');
        for (let j = 0; j < squareNo; j++) {
            newSquare = document.createElement('div');
            newSquare.classList.add('board-square');
            newRow.append(newSquare);
        }
        boardContainer.append(newRow);
    }

    boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => square.addEventListener('mouseenter', colorSquare));

    // Size the squares (total space - borders) / no. of squares
    let squareDim = (IDEAL_BOARD_DIM - (squareNo + 1)) / squareNo;
    console.log(squareNo);
    console.log(squareDim);
    boardSquares.forEach(square => {
        square.style.height = `${squareDim}px`;
        square.style.width = `${squareDim}px`;
    })

    // Make sure that the background is exactly the size of the squares + all the gaps.
    let boardDim = squareNo * (squareDim + 1) + 1;
    console.log(boardDim);
    boardContainer.style.height = `${boardDim}px`;
    boardContainer.style.width = `${boardDim}px`;
};

function colorSquare(e) {
    this.classList.add('colored');
}

clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', clearBoard);

function clearBoard(e) {
    boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => square.classList.remove('colored'));
}

newBrdBtn = document.querySelector('#new-brd-btn');
newBrdBtn.addEventListener('click', promptNewBrd);

function promptNewBrd() {
    let dimension;
    while (true) {
        dimension = prompt("Input the number of squares per side (max. 60):");
        if (dimension === null) return;
        dimension = +dimension;
        if (dimension >= 1 && dimension <= 60) break;
    }

    createBoard(dimension);
};

// Create a default 16x16 board
createBoard(20);


