const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const rows = 50;
const cols = 50;
const cellSize = 10;
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let grid = createGrid(rows, cols);
let running = false;
let interval;

function createGrid(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols).fill(0);
  }
  return arr;
}

function drawGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ctx.beginPath();
      ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);

     
      if (grid[i][j] === 1) {
        ctx.fillStyle = '#6f487e';
      } else {
        ctx.fillStyle = '#1d1d1d'; 
      }

      ctx.fill();
      ctx.strokeStyle = '#333'; 
      ctx.stroke();
    }
  }
}

function updateGrid(grid) {
  const nextGrid = createGrid(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbors = countNeighbors(grid, i, j);
      if (grid[i][j] === 1) {
        nextGrid[i][j] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
      } else {
        nextGrid[i][j] = (neighbors === 3) ? 1 : 0;
      }
    }
  }

  return nextGrid;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const row = (x + i + rows) % rows;
      const col = (y + j + cols) % cols;
      sum += grid[row][col];
    }
  }
  return sum;
}


canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect(); 
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize); 
  grid[y][x] = grid[y][x] ? 0 : 1; 
  drawGrid(grid); 
});

document.getElementById('startBtn').addEventListener('click', function() {
  if (!running) {
    running = true;
    interval = setInterval(() => {
      grid = updateGrid(grid);
      drawGrid(grid);
    }, 100);
  }
});

document.getElementById('stopBtn').addEventListener('click', function() {
  running = false;
  clearInterval(interval);
});

document.getElementById('clearBtn').addEventListener('click', function() {
  running = false;
  clearInterval(interval);
  grid = createGrid(rows, cols);
  drawGrid(grid);
});

drawGrid(grid);

document.getElementById('addPatternBtn').addEventListener('click', function() {
  const selectedPattern = document.getElementById('patternSelect').value;
  addPattern(selectedPattern);
});

function addPattern(pattern) {
  grid = createGrid(rows, cols);
  const midRow = Math.floor(rows / 2);
  const midCol = Math.floor(cols / 2);

  if (pattern === 'glider') {
    grid[midRow][midCol+1] = 1;
    grid[midRow+1][midCol+2] = 1;
    grid[midRow+2][midCol] = 1;
    grid[midRow+2][midCol+1] = 1;
    grid[midRow+2][midCol+2] = 1;
  } else if (pattern === 'blinker') {
    grid[midRow][midCol-1] = 1;
    grid[midRow][midCol] = 1;
    grid[midRow][midCol+1] = 1;
  } else if (pattern === 'block') {
    grid[midRow][midCol] = 1;
    grid[midRow][midCol+1] = 1;
    grid[midRow+1][midCol] = 1;
    grid[midRow+1][midCol+1] = 1;
  } else if (pattern === 'gliderGun') {
    addGliderGun(midRow - 10, midCol - 20);
  }

  drawGrid(grid);
}

function addGliderGun(offsetRow, offsetCol) {
  const gun = [
    [0,24],[1,22],[1,24],[2,12],[2,13],[2,20],[2,21],[2,34],[2,35],
    [3,11],[3,15],[3,20],[3,21],[3,34],[3,35],
    [4,0],[4,1],[4,10],[4,16],[4,20],[4,21],
    [5,0],[5,1],[5,10],[5,14],[5,16],[5,17],[5,22],[5,24],
    [6,10],[6,16],[6,24],
    [7,11],[7,15],
    [8,12],[8,13]
  ];

  for (let [r, c] of gun) {
    const row = offsetRow + r;
    const col = offsetCol + c;
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      grid[row][col] = 1;
    }
  }
}

document.getElementById('randomBtn').addEventListener('click', function() {
  grid = createRandomGrid(rows, cols);
  drawGrid(grid);
});

function createRandomGrid(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() < 0.2 ? 1 : 0; 
    }
  }
  return grid;
}
