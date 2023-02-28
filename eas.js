const IDEAL_BOARD_DIM = 500;

let colorMode = 'solid';
let color = '#000000'; // default color is black

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
            newSquare.style.backgroundColor = "#ffffff";
            newRow.append(newSquare);
        }
        boardContainer.append(newRow);
    }

    boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => square.addEventListener('mouseenter', colorSquare));

    // Size the squares (total space - borders) / no. of squares
    let squareDim = (IDEAL_BOARD_DIM - (squareNo + 1)) / squareNo;
    boardSquares.forEach(square => {
        square.style.height = `${squareDim}px`;
        square.style.width = `${squareDim}px`;
    })

    // Make sure that the background is exactly the size of the squares + all the gaps.
    let boardDim = squareNo * (squareDim + 1) + 1;
    boardContainer.style.height = `${boardDim}px`;
    boardContainer.style.width = `${boardDim}px`;
};

function colorSquare(e) {
    switch (colorMode) {
        case ('solid'):
            this.style.backgroundColor = color;
            break;
        case ('rainbow'):
            this.style.backgroundColor = getRandomColor();
            break;
        case ('darken'):
            this.style.backgroundColor = darkenLighten(this.style.backgroundColor, 'darken');
            break;
        case ('lighten'):
            this.style.backgroundColor = darkenLighten(this.style.backgroundColor, 'lighten');
            break;
        default:
            console.error(`Invalid mode selected: ${colorMode}`)
    }
}

function getRandomColor() {
    red = Math.floor(Math.random() * 256).toString(16);
    green = Math.floor(Math.random() * 256).toString(16);
    blue = Math.floor(Math.random() * 256).toString(16);

    return `#${red + green + blue}`;
}

function darkenLighten(color, op) {
    const re = /rgba?\((\d+), (\d+), (\d+)(, [\.\d]*)?\)/;
    let colors = color.match(re);
    colors = colors.slice(1, 4).map(color => +color);

    let newColors = [];
    let newColor;
    for (color of colors) {
        if (op === 'darken') {
            newColor = color - 26;
            if (newColor < 0) newColor = 0;
        } else {
            newColor = color + 26;
            if (newColor > 255) newColor = 255;
        }
        newColors.push(newColor);
    }

    return '#' + newColors.map(color => color.toString(16).padStart(2, '0')).join("");
}


colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', changeMode);

modeBtns = document.querySelectorAll('.mode');
modeBtns.forEach(btn => btn.addEventListener('click', changeMode))

function changeMode(e) {
    modeBtns.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    switch (this.id) {
        case ('color-picker'):
            colorMode = 'solid';
            color = this.value;
            break;
        case ('rainbow'):
            colorMode = 'rainbow';
            break;
        case ('darken'):
            colorMode = 'darken';
            break;
        case ('lighten'):
            colorMode = 'lighten';
            break;
        case ('eraser'):
            colorMode = 'solid';
            color = '#ffffff';
            break;
        default:
            console.error(`Invalid mode selected: ${this.id}`)
    }
}


clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearBoard);

function clearBoard(e) {
    boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => square.style.backgroundColor = "#fff");
}


brdDimSlider = document.querySelector('#brd-dim-slider');
brdDimSlider.addEventListener('input', changeBoardDim);

function changeBoardDim(e) {
    brdDim = document.querySelector('#brd-dim');
    brdDim.textContent = e.target.value;

    createBoard(+e.target.value);
}

// Create a default board with dimensions as in the default HTML file.
createBoard(+brdDimSlider.value);