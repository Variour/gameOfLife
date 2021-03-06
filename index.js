var edgeLength = 25;
var filledCellPercentage = 0.25;

const edgeLengthInput = document.getElementById('edgeLength');
edgeLengthInput.value = edgeLength;
edgeLengthInput.addEventListener("change", changeEdgeLength);
const filledBoxesPercentInput = document.getElementById('filledBoxesPercent');
filledBoxesPercentInput.value = filledCellPercentage;
filledBoxesPercentInput.addEventListener("change", updateFilledCellPercentage);
document.documentElement.style.setProperty('--edge-length', edgeLength);
const webGrid = document.getElementById('grid');
var grid;
setupGrid();
document.getElementById('evolve').addEventListener('click', evolve);
document.getElementById('clearBoard').addEventListener('click', clearBoard);
document.getElementById('resetBoard').addEventListener('click', fillGrid);

function updateGrid() {
    for (var i = 0; i < edgeLength; i++) {
        for (var j = 0; j < edgeLength; j++) {
            document.getElementById(`${i}-${j}`).textContent = grid[i][j] ? 'x' : '';
        }
    }
}

function evolve() {
    var newGrid = [];
    for (var i = 0; i < edgeLength; i++) {
        newGrid[i] = [];
        for (var j = 0; j < edgeLength; j++) {
            var aliveNeighbours = grid[i][j] ? -1 : 0;
            for (var k = -1; k < 2; k++) {
                for (var l = -1; l < 2; l++) {
                    const xPosition = i + k;
                    const yPosition = j + l;
                    if (xPosition >= 0 && xPosition < edgeLength && yPosition >= 0 && yPosition < edgeLength) {
                        if (grid[xPosition][yPosition]) {
                            aliveNeighbours++;
                        }
                    }
                }
            }
            switch (aliveNeighbours) {
                case 3:
                    newGrid[i][j] = true;
                    break;
                case 2:
                    if (grid[i][j]) {
                        newGrid[i][j] = true;
                    } else {
                        newGrid[i][j] = false;
                    }
                    break;
                default:
                    newGrid[i][j] = false;
            }
        }
    }
    grid = newGrid;
    updateGrid();
}

function toggleCell(evt) {
    const [xPosition, yPosition] = evt.target.id.split('-');
    grid[xPosition][yPosition] ^= true;
    updateGrid();
}

function clearBoard() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].fill(false);
    }
    updateGrid();
}

function changeEdgeLength(evt) {
    edgeLength = evt.target.value;
    document.documentElement.style.setProperty('--edge-length', edgeLength);
    setupGrid();
}

function fillGrid(type, update = true) {
    switch (type) {
        default:
            grid = [];
            for (var i = 0; i < edgeLength; i++) {
                grid[i] = [];
                for (var j = 0; j < edgeLength; j++) {
                    grid[i][j] = Math.random() < filledCellPercentage ? true : false;
                }
            }
            break;
    }
    if (update) {
        updateGrid();
    }
}

function setupGrid() {
    fillGrid('random', false);
    document.getElementById('grid').innerHTML = '';
    for (var i = 0; i < edgeLength; i++) {
        for (var j = 0; j < edgeLength; j++) {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.id = `${i}-${j}`;
            const node = document.createTextNode('');
            div.appendChild(node);
            div.addEventListener('click', toggleCell)
            webGrid.appendChild(div);
        }
    }
    updateGrid();
}

function updateFilledCellPercentage(evt) {
    filledCellPercentage = evt.target.value;
    fillGrid();
}