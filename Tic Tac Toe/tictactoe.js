// *** Game state & logic FOR TIC TAC TOE  ***

let cells = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  
  let currentPlayer = 'X';
  
  function move(row, col) {
    if (cells[row][col] === '') {
      cells[row][col] = currentPlayer;
      currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
      return getWinner(cells);
    }
  }
  
  function sameNotEmpty(array) {
    return array.every(x => array[0] === x && x !== '');
  }
  
  function getWinner(cells) {
    const winningPositions = [
      // for the rows in Tic Tac Toe background
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // for the column in the Tic Tac Toe
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
    
    const valuesAtWinningPositions = winningPositions.map(
      pos => pos.map(cellPos => cells[cellPos[1]][cellPos[0]]));
    
    const winningRow = valuesAtWinningPositions.find(sameNotEmpty);
    const winner = winningRow ? winningRow[0] : null;
    const isTie = !winner && cells.flat().every(cell => cell != '');
    return isTie ? 'Nobody' : winner;
  }
  
  
  // *** Player interaction ***
  
  const rows = cells.length;
  const cols = cells[0].length;
  const cellSize = 130;
  
  function setup() {
    createCanvas(cols * cellSize, rows * cellSize);
  }
  
  function mouseClicked() {
    if(mouseY < height && mouseX < width) {
      const winner = move(floor(mouseY / cellSize), floor(mouseX / cellSize));
      if(winner) {
        noLoop();
        console.log(winner + ' wins!');
      }
    }
  }
  
  
  // *** DRAWING TOPICS FOR THE BACKGROUND IN TIC TAC TOE ***
  
  function draw() {
    background(255);
    drawCells(cells, rows, cols, cellSize);
    drawGrid(rows, cols, cellSize);
  }
  
  function drawCells(cells, rows, cols, cellSize) {
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        drawCell(cells[row][col], row, col, cellSize);
  }
  
  function drawGrid(rows, cols, size) {
    for (let row = 1; row < rows; row++)
      line(0, row * size, cols * size, row * size);
    for (let col = 1; col < cols; col++)
      line(col * size, 0, col * size, rows * size);
  }
  
  function drawCell(cell, row, col, width) {
    textSize(width * 0.75);
    textAlign(CENTER, CENTER);
    text(cell, col * width + width / 2, row * width + width / 2);
  }