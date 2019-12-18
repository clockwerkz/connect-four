const grid = document.querySelector('.grid');
let gameGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ],
  [0, 0, 0, 0, 0, 0, 0, 0 ]
];

let gameOver = false;

let columnPtr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Keeps track of the "height" of each column

grid.addEventListener('click', (e)=>{
  let index  = parseInt(e.target.dataset.value);
  if (!gameOver && columnPtr[index] < gameGrid[0].length) {
    dropNewChip('red', index, e.target);
    let rnd = Math.floor(Math.random()*10);
    while (columnPtr[rnd] >= gameGrid[0].length) {
      rnd = Math.floor(Math.random()*10);
    }
    let column = document.querySelector(`#col-${rnd+1}`);
    dropNewChip('yellow', rnd, column);
  }
})

document.querySelector('.endgame button').addEventListener('click', ()=>{
  gameOver = false;
  gameGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0 ]
  ];
  columnPtr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let columnList = document.querySelectorAll('.column');
  columnList.forEach(col=> {
    col.innerHTML = '';
  });
  document.querySelector('.endgame').classList.remove('show');
});

function dropNewChip(color, index, column) {
  let chip = document.createElement('div');
  chip.classList.add('chip',`chip--${color}`);
  column.prepend(chip);
  let y = columnPtr[index]++;
  gameGrid[index][y] = color;
  if (checkForWin(color)) {
    if(color === 'red') {
      gameIsOver('You Win The Game!');
    } else {
      gameIsOver('Computer Wins The Game!');
    }
  }
}


function checkForWin(plyr) {
  //check Vertically
  for (let i = 0; i < gameGrid.length; i++) {
    for (let j=0; j < gameGrid[i].length-3; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i][j+1] === plyr && gameGrid[i][j+2] === plyr && gameGrid[i][j+3] === plyr ) {
        return true;
      }
    }
  }
  //check Horizontally
  for (let i = 0; i < gameGrid.length-3; i++) {
    for (let j=0; j < gameGrid[i].length; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i+1][j] === plyr && gameGrid[i+2][j] === plyr && gameGrid[i+3][j] === plyr ) {
        return true;
      }
    }
  }

  //upward slope
  for (let i = gameGrid.length-1; i > 2; i--) {
    for (let j=0; j < gameGrid[i].length-3; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i-1][j+1] === plyr && gameGrid[i-2][j+2] === plyr && gameGrid[i-3][j+3] === plyr ) {
        return true;
      }
    }
  }

  //downward slope
  for (let i = 0; i < gameGrid.length-3; i++) {
    for (let j=0; j < gameGrid[i].length-3; j++) {
      if (gameGrid[i][j] === plyr && gameGrid[i+1][j+1] === plyr && gameGrid[i+2][j+2] === plyr && gameGrid[i+3][j+3] === plyr ) {
        return true;
      }
    }
  }
  return false;
}

function gameIsOver (str) {
  gameOver = true;
  document.querySelector('.endgame h1').textContent = str;
  document.querySelector('.endgame').classList.add('show');
}


